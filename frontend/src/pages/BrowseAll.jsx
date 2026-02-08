import { useState, useEffect, useCallback } from 'react';
import { getProjects, getServices, getCapitalSources } from '../api';
import DirectoryCard from '../components/DirectoryCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import BrandButton from '../components/brand/BrandButton';
import BrandInput from '../components/brand/BrandInput';
import BrandSelect from '../components/brand/BrandSelect';

function BrowseAll() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filterType, setFilterType] = useState('all');

    const typeOptions = [
        { value: 'all', label: 'All Categories' },
        { value: 'project', label: 'Land-Based Projects' },
        { value: 'service', label: 'Service Providers' },
        { value: 'capital', label: 'Capital Sources' }
    ];

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        loadAllData();
    }, [debouncedSearch, filterType]);

    const loadAllData = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {};
            if (debouncedSearch) params.search = debouncedSearch;

            const fetchPromises = [];

            if (filterType === 'all' || filterType === 'project') {
                fetchPromises.push(getProjects(params).then(res =>
                    (res.results || res).map(p => ({ ...p, type: 'project' }))
                ));
            }

            if (filterType === 'all' || filterType === 'service') {
                fetchPromises.push(getServices(params).then(res =>
                    (res.results || res).map(s => ({ ...s, type: 'service' }))
                ));
            }

            if (filterType === 'all' || filterType === 'capital') {
                fetchPromises.push(getCapitalSources(params).then(res =>
                    (res.results || res).map(c => ({ ...c, type: 'capital' }))
                ));
            }

            const results = await Promise.all(fetchPromises);
            let fetchedItems = results.flat();

            // Sort by featured first, then name
            fetchedItems.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return a.name.localeCompare(b.name);
            });

            setItems(fetchedItems);
        } catch (err) {
            setError('Failed to load directory data. Please check your connection.');
            console.error('Error loading browse data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in">
            <PageHeader
                title="Regenerative Directory"
                subtitle="Discover projects, services, and capital sources building the regenerative economy."
                icon="🌍"
            />

            <div className="search-filters" style={{ marginBottom: 'var(--space-2xl)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-md)' }}>
                    <div style={{ position: 'relative' }}>
                        <BrandInput
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, location, or description..."
                            className="search-box"
                            style={{ paddingLeft: '3rem' }}
                        />
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="clear-search"
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <BrandSelect
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        options={typeOptions}
                    />
                </div>
            </div>

            {error && <ErrorState message={error} onRetry={loadAllData} />}

            {loading ? (
                <LoadingState message="Searching directory..." />
            ) : items.length > 0 ? (
                <div className="directory-grid">
                    {items.map(item => (
                        <DirectoryCard
                            key={`${item.type}-${item.id}`}
                            item={item}
                            type={item.type}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="🔍"
                    message={debouncedSearch ? `No results found for "${debouncedSearch}"` : "No matching records found. Try adjusting your filters."}
                    action={
                        <Link to="/submit" style={{ textDecoration: 'none' }}>
                            <BrandButton variant="primary">Add Your Enterprise</BrandButton>
                        </Link>
                    }
                />
            )}
        </div>
    );
}

export default BrowseAll;

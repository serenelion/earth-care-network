import { useState, useEffect } from 'react';
import { getCapital, getCapitalCategories } from '../api';
import DirectoryCard from '../components/DirectoryCard';
import SearchFilters from '../components/SearchFilters';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';

function Capital() {
  const [capital, setCapital] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadCapital();
  }, [search, category]);

  const loadCategories = async () => {
    try {
      const data = await getCapitalCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadCapital = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      
      const data = await getCapital(params);
      setCapital(data.results || data);
      setError(null);
    } catch (err) {
      setError('Failed to load capital sources. Make sure the backend is running on http://localhost:8000');
      console.error('Error loading capital:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <PageHeader
        title="Conscious Capital"
        subtitle="Find impact investors, grant programs, and funding sources supporting regenerative agriculture, conservation, and environmental restoration."
        icon="💚"
      />

      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        placeholder="Search capital sources by name, focus area, or funding type..."
      />

      {error && <ErrorState message={error} onRetry={loadCapital} />}

      {loading ? (
        <LoadingState message="Loading capital sources..." />
      ) : capital.length > 0 ? (
        <div className="directory-grid">
          {capital.map(cap => (
            <DirectoryCard
              key={cap.id}
              item={cap}
              type="capital"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          message="No capital sources found. Try adjusting your search filters."
          action={
            <Link to="/submit" className="btn btn-primary">
              Submit a Capital Source
            </Link>
          }
        />
      )}
    </div>
  );
}

export default Capital;

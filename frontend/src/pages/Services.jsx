import { useState, useEffect } from 'react';
import { getServices, getServiceCategories } from '../api';
import DirectoryCard from '../components/DirectoryCard';
import SearchFilters from '../components/SearchFilters';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadServices();
  }, [search, category]);

  const loadCategories = async () => {
    try {
      const data = await getServiceCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadServices = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      
      const data = await getServices(params);
      setServices(data.results || data);
      setError(null);
    } catch (err) {
      setError('Failed to load services. Make sure the backend is running on http://localhost:8000');
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <PageHeader
        title="Service Providers"
        subtitle="Connect with consultants, designers, and implementers offering regenerative design, permaculture, holistic management, and restoration services."
        icon="🛠️"
      />

      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        placeholder="Search service providers by name, location, or specialization..."
      />

      {error && <ErrorState message={error} onRetry={loadServices} />}

      {loading ? (
        <LoadingState message="Loading service providers..." />
      ) : services.length > 0 ? (
        <div className="directory-grid">
          {services.map(service => (
            <DirectoryCard
              key={service.id}
              item={service}
              type="service"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          message="No service providers found. Try adjusting your search filters."
          action={
            <Link to="/submit" className="btn btn-primary">
              Submit a Service Provider
            </Link>
          }
        />
      )}
    </div>
  );
}

export default Services;

import { useState, useEffect } from 'react';
import { getServices, getServiceCategories } from '../api';

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
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d5016' }}>Service Providers</h2>

      <div className="search-filters">
        <input
          type="text"
          className="search-box"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="filters">
          <select 
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading services...</div>
      ) : (
        <div className="grid">
          {services.map(service => (
            <div key={service.id} className="card">
              <h3>{service.name}</h3>
              <div className="location">📍 {service.location}</div>
              <div className="description">{service.description}</div>
              
              {service.services && service.services.length > 0 && (
                <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <strong>Services:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    {service.services.map((s, idx) => (
                      <span key={idx} style={{ 
                        display: 'inline-block',
                        background: '#f0f0f0',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <a 
                href={service.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Visit Website
              </a>
              {service.tags && service.tags.length > 0 && (
                <div className="tags">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && services.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          No services found. Try adjusting your search filters.
        </div>
      )}
    </div>
  );
}

export default Services;

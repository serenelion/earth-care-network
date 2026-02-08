import { useState, useEffect } from 'react';
import { getCapitalSources, getCapitalCategories, getFundingTypes } from '../api';

function Capital() {
  const [capital, setCapital] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [fundingType, setFundingType] = useState('');
  const [categories, setCategories] = useState([]);
  const [fundingTypes, setFundingTypes] = useState([]);

  useEffect(() => {
    loadCategories();
    loadFundingTypes();
  }, []);

  useEffect(() => {
    loadCapital();
  }, [search, category, fundingType]);

  const loadCategories = async () => {
    try {
      const data = await getCapitalCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadFundingTypes = async () => {
    try {
      const data = await getFundingTypes();
      setFundingTypes(data);
    } catch (err) {
      console.error('Error loading funding types:', err);
    }
  };

  const loadCapital = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (fundingType) params.funding_type = fundingType;
      
      const data = await getCapitalSources(params);
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
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d5016' }}>Conscious Capital Sources</h2>

      <div className="search-filters">
        <input
          type="text"
          className="search-box"
          placeholder="Search capital sources..."
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

          <select 
            className="filter-select"
            value={fundingType}
            onChange={(e) => setFundingType(e.target.value)}
          >
            <option value="">All Funding Types</option>
            {fundingTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading capital sources...</div>
      ) : (
        <div className="grid">
          {capital.map(source => (
            <div key={source.id} className="card">
              <h3>{source.name}</h3>
              <div className="location">📍 {source.location}</div>
              <div style={{ 
                marginBottom: '0.75rem',
                fontSize: '0.9rem',
                color: '#4a7c2c',
                fontWeight: '600'
              }}>
                {source.funding_type && source.funding_type.replace(/_/g, ' ').toUpperCase()}
              </div>
              <div className="description">{source.description}</div>
              
              {source.focus_areas && source.focus_areas.length > 0 && (
                <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <strong>Focus Areas:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    {source.focus_areas.map((area, idx) => (
                      <span key={idx} style={{ 
                        display: 'inline-block',
                        background: '#f0f0f0',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Visit Website
              </a>
              {source.tags && source.tags.length > 0 && (
                <div className="tags">
                  {source.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && capital.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          No capital sources found. Try adjusting your search filters.
        </div>
      )}
    </div>
  );
}

export default Capital;

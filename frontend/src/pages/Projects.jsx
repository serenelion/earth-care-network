import { useState, useEffect } from 'react';
import { getProjects, getProjectCategories } from '../api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProjects();
  }, [search, category]);

  const loadCategories = async () => {
    try {
      const data = await getProjectCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      
      const data = await getProjects(params);
      setProjects(data.results || data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects. Make sure the backend is running on http://localhost:8000');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d5016' }}>Land-Based Projects</h2>

      <div className="search-filters">
        <input
          type="text"
          className="search-box"
          placeholder="Search projects..."
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
        <div className="loading">Loading projects...</div>
      ) : (
        <div className="grid">
          {projects.map(project => (
            <div key={project.id} className="card">
              <h3>{project.name}</h3>
              <div className="location">📍 {project.location}</div>
              <div className="description">{project.description}</div>
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Visit Website
              </a>
              {project.tags && project.tags.length > 0 && (
                <div className="tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          No projects found. Try adjusting your search filters.
        </div>
      )}
    </div>
  );
}

export default Projects;

import { useState, useEffect } from 'react';
import { getProjects, getProjectCategories } from '../api';
import DirectoryCard from '../components/DirectoryCard';
import SearchFilters from '../components/SearchFilters';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';

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
    <div className="fade-in">
      <PageHeader
        title="Land-Based Projects"
        subtitle="Discover regenerative farms, retreat centers, intentional communities, and educational centers pioneering sustainable living and ecosystem restoration."
        icon="🌱"
      />

      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        placeholder="Search projects by name, location, or description..."
      />

      {error && <ErrorState message={error} onRetry={loadProjects} />}

      {loading ? (
        <LoadingState message="Loading projects..." />
      ) : projects.length > 0 ? (
        <div className="directory-grid">
          {projects.map(project => (
            <DirectoryCard
              key={project.id}
              item={project}
              type="project"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          message="No projects found. Try adjusting your search filters."
          action={
            <Link to="/submit" className="btn btn-primary">
              Submit a Project
            </Link>
          }
        />
      )}
    </div>
  );
}

export default Projects;

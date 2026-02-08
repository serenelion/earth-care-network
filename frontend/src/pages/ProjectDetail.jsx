import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjects } from '../api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

/**
 * Enterprise Profile: Land-Based Project Detail Page
 */
function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await getProjects({ id });
      const projects = data.results || data;
      const found = projects.find(p => p.id === parseInt(id));
      
      if (found) {
        setProject(found);
        setError(null);
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError('Failed to load project details');
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState message="Loading project details..." />;
  if (error) return <ErrorState message={error} onRetry={loadProject} />;
  if (!project) return <ErrorState message="Project not found" />;

  return (
    <div className="enterprise-profile fade-in">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">›</span>
        <Link to="/projects">Projects</Link>
        <span className="separator">›</span>
        <span>{project.name}</span>
      </nav>

      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-icon">🌱</div>
          <div>
            <h1 className="profile-title">{project.name}</h1>
            {project.location && (
              <div className="profile-location">
                <span>📍</span> {project.location}
              </div>
            )}
          </div>
        </div>
        {project.featured && (
          <div className="featured-badge">
            <span>⭐</span> Featured
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="profile-grid">
        {/* Main Column */}
        <div className="profile-main">
          {/* About */}
          <section className="profile-section">
            <h2>About</h2>
            <p className="profile-description">{project.description}</p>
          </section>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <section className="profile-section">
              <h3>Focus Areas</h3>
              <div className="tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag tag-large">{tag}</span>
                ))}
              </div>
            </section>
          )}

          {/* Additional Details */}
          {project.size_acres && (
            <section className="profile-section">
              <h3>Property Size</h3>
              <p className="profile-stat">
                <span className="stat-value">{project.size_acres}</span> acres
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="profile-sidebar">
          {/* Contact Card */}
          <div className="sidebar-card">
            <h3>Contact Information</h3>
            
            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
              >
                Visit Website →
              </a>
            )}

            {project.contact_email && (
              <a 
                href={`mailto:${project.contact_email}`}
                className="contact-item"
              >
                <span>✉️</span> {project.contact_email}
              </a>
            )}

            {project.contact_phone && (
              <a 
                href={`tel:${project.contact_phone}`}
                className="contact-item"
              >
                <span>📞</span> {project.contact_phone}
              </a>
            )}

            {project.address && (
              <div className="contact-item">
                <span>📮</span>
                <div>{project.address}</div>
              </div>
            )}
          </div>

          {/* Category Info */}
          {project.category && (
            <div className="sidebar-card">
              <h3>Type</h3>
              <div className="category-badge">{project.category}</div>
            </div>
          )}

          {/* Verification */}
          {project.is_verified && (
            <div className="sidebar-card verification-card">
              <div className="verification-icon">✓</div>
              <h3>Verified Enterprise</h3>
              <p className="verification-text">
                This project has been verified by the Earth Care Network team.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Back Button */}
      <div className="profile-actions">
        <button 
          className="btn btn-outline" 
          onClick={() => navigate('/projects')}
        >
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}

export default ProjectDetail;

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServices } from '../api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

/**
 * Enterprise Profile: Service Provider Detail Page
 */
function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    try {
      setLoading(true);
      const data = await getServices({ id });
      const services = data.results || data;
      const found = services.find(s => s.id === parseInt(id));
      
      if (found) {
        setService(found);
        setError(null);
      } else {
        setError('Service provider not found');
      }
    } catch (err) {
      setError('Failed to load service provider details');
      console.error('Error loading service:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState message="Loading service provider details..." />;
  if (error) return <ErrorState message={error} onRetry={loadService} />;
  if (!service) return <ErrorState message="Service provider not found" />;

  return (
    <div className="enterprise-profile fade-in">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">›</span>
        <Link to="/services">Services</Link>
        <span className="separator">›</span>
        <span>{service.name}</span>
      </nav>

      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-icon">🛠️</div>
          <div>
            <h1 className="profile-title">{service.name}</h1>
            {service.location && (
              <div className="profile-location">
                <span>📍</span> {service.location}
              </div>
            )}
          </div>
        </div>
        {service.featured && (
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
            <p className="profile-description">{service.description}</p>
          </section>

          {/* Services Offered */}
          {service.services && service.services.length > 0 && (
            <section className="profile-section">
              <h3>Services Offered</h3>
              <ul className="services-list">
                {service.services.map((svc, idx) => (
                  <li key={idx}>
                    <span className="service-bullet">✓</span> {svc}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Service Area */}
          {service.service_area && (
            <section className="profile-section">
              <h3>Service Area</h3>
              <p className="profile-stat">
                <span>🗺️</span> {service.service_area}
              </p>
            </section>
          )}

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <section className="profile-section">
              <h3>Specializations</h3>
              <div className="tags">
                {service.tags.map((tag, idx) => (
                  <span key={idx} className="tag tag-large">{tag}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="profile-sidebar">
          {/* Contact Card */}
          <div className="sidebar-card">
            <h3>Contact Information</h3>
            
            {service.url && (
              <a 
                href={service.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
              >
                Visit Website →
              </a>
            )}

            {service.contact_email && (
              <a 
                href={`mailto:${service.contact_email}`}
                className="contact-item"
              >
                <span>✉️</span> {service.contact_email}
              </a>
            )}

            {service.contact_phone && (
              <a 
                href={`tel:${service.contact_phone}`}
                className="contact-item"
              >
                <span>📞</span> {service.contact_phone}
              </a>
            )}

            {service.address && (
              <div className="contact-item">
                <span>📮</span>
                <div>{service.address}</div>
              </div>
            )}
          </div>

          {/* Category Info */}
          {service.category && (
            <div className="sidebar-card">
              <h3>Service Category</h3>
              <div className="category-badge">{service.category}</div>
            </div>
          )}

          {/* Verification */}
          {service.is_verified && (
            <div className="sidebar-card verification-card">
              <div className="verification-icon">✓</div>
              <h3>Verified Provider</h3>
              <p className="verification-text">
                This service provider has been verified by the Earth Care Network team.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Back Button */}
      <div className="profile-actions">
        <button 
          className="btn btn-outline" 
          onClick={() => navigate('/services')}
        >
          ← Back to Services
        </button>
      </div>
    </div>
  );
}

export default ServiceDetail;

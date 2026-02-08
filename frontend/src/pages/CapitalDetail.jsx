import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCapital } from '../api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

/**
 * Enterprise Profile: Capital Source Detail Page
 */
function CapitalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capital, setCapital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCapital();
  }, [id]);

  const loadCapital = async () => {
    try {
      setLoading(true);
      const data = await getCapital({ id });
      const capitalSources = data.results || data;
      const found = capitalSources.find(c => c.id === parseInt(id));
      
      if (found) {
        setCapital(found);
        setError(null);
      } else {
        setError('Capital source not found');
      }
    } catch (err) {
      setError('Failed to load capital source details');
      console.error('Error loading capital:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState message="Loading capital source details..." />;
  if (error) return <ErrorState message={error} onRetry={loadCapital} />;
  if (!capital) return <ErrorState message="Capital source not found" />;

  return (
    <div className="enterprise-profile fade-in">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">›</span>
        <Link to="/capital">Capital</Link>
        <span className="separator">›</span>
        <span>{capital.name}</span>
      </nav>

      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-icon">💚</div>
          <div>
            <h1 className="profile-title">{capital.name}</h1>
            {capital.location && (
              <div className="profile-location">
                <span>📍</span> {capital.location}
              </div>
            )}
          </div>
        </div>
        {capital.featured && (
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
            <p className="profile-description">{capital.description}</p>
          </section>

          {/* Investment Range */}
          {capital.typical_investment_range && (
            <section className="profile-section">
              <h3>Typical Investment Range</h3>
              <p className="profile-stat highlight">
                <span>💰</span> {capital.typical_investment_range}
              </p>
            </section>
          )}

          {/* Focus Areas */}
          {capital.focus_areas && capital.focus_areas.length > 0 && (
            <section className="profile-section">
              <h3>Focus Areas</h3>
              <ul className="focus-list">
                {capital.focus_areas.map((area, idx) => (
                  <li key={idx}>
                    <span className="focus-bullet">✓</span> {area}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tags */}
          {capital.tags && capital.tags.length > 0 && (
            <section className="profile-section">
              <h3>Topics</h3>
              <div className="tags">
                {capital.tags.map((tag, idx) => (
                  <span key={idx} className="tag tag-large">{tag}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="profile-sidebar">
          {/* Application CTA */}
          <div className="sidebar-card cta-card">
            <h3>Apply for Funding</h3>
            
            {capital.application_url && (
              <a 
                href={capital.application_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
              >
                Apply Now →
              </a>
            )}

            {capital.url && (
              <a 
                href={capital.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-block"
              >
                Learn More
              </a>
            )}
          </div>

          {/* Contact Card */}
          <div className="sidebar-card">
            <h3>Contact Information</h3>

            {capital.contact_email && (
              <a 
                href={`mailto:${capital.contact_email}`}
                className="contact-item"
              >
                <span>✉️</span> {capital.contact_email}
              </a>
            )}

            {capital.address && (
              <div className="contact-item">
                <span>📮</span>
                <div>{capital.address}</div>
              </div>
            )}
          </div>

          {/* Category & Type Info */}
          <div className="sidebar-card">
            {capital.category && (
              <>
                <h3>Category</h3>
                <div className="category-badge">{capital.category}</div>
              </>
            )}
            
            {capital.funding_type && (
              <>
                <h3 style={{ marginTop: 'var(--space-lg)' }}>Funding Type</h3>
                <div className="category-badge">{capital.funding_type}</div>
              </>
            )}
          </div>

          {/* Verification */}
          {capital.is_verified && (
            <div className="sidebar-card verification-card">
              <div className="verification-icon">✓</div>
              <h3>Verified Source</h3>
              <p className="verification-text">
                This capital source has been verified by the Earth Care Network team.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Back Button */}
      <div className="profile-actions">
        <button 
          className="btn btn-outline" 
          onClick={() => navigate('/capital')}
        >
          ← Back to Capital Sources
        </button>
      </div>
    </div>
  );
}

export default CapitalDetail;

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Reusable Directory Card Component
 * Used for Projects, Services, and Capital sources
 */
function DirectoryCard({ item, type, onClick }) {
  const typeConfig = {
    project: {
      icon: '🌱',
      linkBase: '/projects',
      categoryLabel: 'Type'
    },
    service: {
      icon: '🛠️',
      linkBase: '/services',
      categoryLabel: 'Service Type'
    },
    capital: {
      icon: '💚',
      linkBase: '/capital',
      categoryLabel: 'Funding Type'
    }
  };

  const config = typeConfig[type] || typeConfig.project;

  return (
    <Link 
      to={`${config.linkBase}/${item.id}`} 
      className={`directory-card ${item.featured ? 'featured' : ''}`}
      onClick={onClick}
    >
      <div className="card-header">
        <div>
          <h3>{item.name}</h3>
          {item.location && (
            <div className="location">
              <span>📍</span> {item.location}
            </div>
          )}
        </div>
      </div>

      <p className="description">{item.description}</p>

      {item.category && (
        <div className="meta-info">
          <span className="meta-label">{config.categoryLabel}:</span>
          <span className="meta-value">{item.category}</span>
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="tags">
          {item.tags.slice(0, 5).map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {item.verified && (
        <div className="verified-badge">
          <span>✓</span> Verified
        </div>
      )}
    </Link>
  );
}

DirectoryCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    featured: PropTypes.bool,
    verified: PropTypes.bool,
  }).isRequired,
  type: PropTypes.oneOf(['project', 'service', 'capital']).isRequired,
  onClick: PropTypes.func,
};

export default DirectoryCard;

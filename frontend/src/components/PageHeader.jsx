import PropTypes from 'prop-types';

/**
 * Reusable Page Header Component
 * Consistent header styling across all pages
 */
function PageHeader({ title, subtitle, icon }) {
  return (
    <div className="page-header">
      {icon && <div className="page-icon">{icon}</div>}
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
};

export default PageHeader;

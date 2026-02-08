import PropTypes from 'prop-types';

/**
 * Reusable Empty State Component
 */
function EmptyState({ icon = "📭", message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <p className="empty-state-message">{message}</p>
      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string.isRequired,
  action: PropTypes.node,
};

export default EmptyState;

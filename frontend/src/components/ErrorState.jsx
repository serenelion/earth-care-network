import PropTypes from 'prop-types';

/**
 * Reusable Error State Component
 */
function ErrorState({ message, onRetry }) {
  return (
    <div className="error">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorState;

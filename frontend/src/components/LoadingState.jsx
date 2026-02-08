import PropTypes from 'prop-types';

/**
 * Reusable Loading State Component
 */
function LoadingState({ message = "Loading..." }) {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
}

LoadingState.propTypes = {
  message: PropTypes.string,
};

export default LoadingState;

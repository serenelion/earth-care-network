import React from 'react';
import PropTypes from 'prop-types';

const BrandButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  type = 'button', 
  disabled = false, 
  onClick,
  style = {}
}) => {
  const baseStyle = {
    padding: 'var(--space-md) var(--space-xl)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-normal)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    whiteSpace: 'nowrap',
    border: 'none',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  const variants = {
    primary: {
      background: 'var(--terralux-gold)',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
    },
    secondary: {
      background: 'white',
      color: 'var(--earth-green)',
      border: '2px solid var(--earth-green)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--earth-green)',
      border: '2px solid var(--earth-green)',
    }
  };

  const hoverStyles = !disabled ? {
    primary: {
      background: 'var(--terralux-gold-dark)',
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-lg)',
    },
    secondary: {
      background: 'var(--earth-green)',
      color: 'white',
    },
    outline: {
      background: 'var(--earth-green)',
      color: 'white',
    }
  } : {};

  // We'll use CSS classes instead of inline styles for hover to keep it simple
  // but since we want to be "wow", let's make sure it looks great.
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

BrandButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default BrandButton;

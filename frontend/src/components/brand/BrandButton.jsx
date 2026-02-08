import React from 'react';
import PropTypes from 'prop-types';

const BrandButton = ({
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false,
    onClick,
    style = {},
    premium = true
}) => {
    const variantClass = `btn-${variant}`;
    const premiumClass = (variant === 'primary' && premium) ? 'btn-premium' : '';

    return (
        <button
            type={type}
            className={`btn ${variantClass} ${premiumClass} ${className}`}
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
    premium: PropTypes.bool,
};

export default BrandButton;

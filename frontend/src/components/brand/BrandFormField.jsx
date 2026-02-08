import React from 'react';
import PropTypes from 'prop-types';

const BrandFormField = ({
    label,
    children,
    required = false,
    className = '',
    style = {}
}) => {
    return (
        <div
            className={`form-group ${className}`}
            style={{
                marginBottom: 'var(--space-lg)',
                ...style
            }}
        >
            {label && (
                <label className="brand-form-label">
                    {label} {required && <span className="required-mark">*</span>}
                </label>
            )}
            {children}
        </div>
    );
};

BrandFormField.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default BrandFormField;

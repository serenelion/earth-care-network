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
                <label
                    style={{
                        display: 'block',
                        marginBottom: 'var(--space-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--earth-green)',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
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

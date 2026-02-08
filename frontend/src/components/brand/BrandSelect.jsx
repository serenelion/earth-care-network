import React from 'react';
import PropTypes from 'prop-types';

const BrandSelect = ({
    value,
    onChange,
    options = [],
    required = false,
    name,
    className = '',
    style = {}
}) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`brand-select ${className}`}
            style={{
                width: '100%',
                padding: 'var(--space-md) var(--space-lg)',
                fontSize: 'var(--font-size-base)',
                border: '2px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition-fast)',
                backgroundColor: 'var(--bg-primary)',
                cursor: 'pointer',
                ...style
            }}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

BrandSelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    required: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default BrandSelect;

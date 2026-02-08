import React from 'react';
import PropTypes from 'prop-types';

const BrandTextarea = ({
    value,
    onChange,
    placeholder,
    required = false,
    name,
    rows = 4,
    className = '',
    style = {}
}) => {
    return (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={`brand-textarea ${className}`}
            style={{
                width: '100%',
                padding: 'var(--space-md) var(--space-lg)',
                fontSize: 'var(--font-size-base)',
                border: '2px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition-fast)',
                backgroundColor: 'var(--bg-primary)',
                resize: 'vertical',
                minHeight: '120px',
                ...style
            }}
        />
    );
};

BrandTextarea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    name: PropTypes.string,
    rows: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default BrandTextarea;

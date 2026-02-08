import React from 'react';
import PropTypes from 'prop-types';

const BrandInput = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    name,
    className = '',
    style = {}
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`brand-input ${className}`}
            style={style}
        />
    );
};

BrandInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default BrandInput;

import PropTypes from 'prop-types';

/**
 * Reusable Search and Filter Component
 * Used across all directory pages
 */
function SearchFilters({ 
  search, 
  onSearchChange, 
  category, 
  onCategoryChange, 
  categories = [],
  placeholder = "Search...",
  showCategoryFilter = true 
}) {
  return (
    <div className="search-filters">
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-box"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button 
            className="clear-search" 
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      
      {showCategoryFilter && categories.length > 0 && (
        <div className="filters">
          <select 
            className="filter-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

SearchFilters.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  category: PropTypes.string,
  onCategoryChange: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  showCategoryFilter: PropTypes.bool,
};

export default SearchFilters;

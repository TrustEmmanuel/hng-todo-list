import { CATEGORIES } from '../taskOptions'

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
]

/**
 * Status tabs plus an optional category dropdown.
 * Search is applied separately in App so both filters can run together.
 */
function FilterBar({ currentFilter, onChange, categoryFilter, onCategoryChange }) {
  return (
    <div className="filter-wrap">
      <div className="filter-bar" role="tablist" aria-label="Filter tasks">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={currentFilter === filter.id}
            className={`filter-bar__btn${currentFilter === filter.id ? ' is-active' : ''}`}
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <label className="filter-category">
        <span className="sr-only">Filter by category</span>
        <select
          value={categoryFilter}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FilterBar

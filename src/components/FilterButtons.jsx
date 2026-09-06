const filters = [
  { value: "all", label: "Alla" },
  { value: "active", label: "Aktiva" },
  { value: "completed", label: "Slutförda" },
];

function FilterButtons({ selectedFilter, onFilterChange }) {
  return (
    <div className="filter-group" aria-label="Filtrera uppgifter">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={selectedFilter === filter.value ? "active" : ""}
          aria-pressed={selectedFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;

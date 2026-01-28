import { useEffect, useState } from "react";
import Filters from "./Filters";
import { SearchContext } from "../../../../context/SearchContext";
import { useContext } from "react";

export default function FiltersContainer({ filters }) {
  const [openKey, setOpenKey] = useState(null);
  const { activeFilters, setActiveFilters } = useContext(SearchContext);
  // const [dropdownState, setDropdownState] = useState(
  //   Object.fromEntries(
  //     filters.map(({ key }) => [key, { isOpen: false, selected: null }])
  //   )
  // );

  const [dropdownState, setDropdownState] = useState(() => {
    const initialState = Object.fromEntries(
      filters.map(({ key }) => [key, { isOpen: false, selected: null }])
    );

    // Initialize from activeFilters context
    Object.entries(activeFilters).forEach(([key, id]) => {
      if (initialState[key]) {
        const filter = filters.find((f) => f.key === key);
        if (filter) {
          const selectedOption = filter.options.find((opt) => opt.id === id);
          if (selectedOption) {
            initialState[key].selected = selectedOption.name;
          }
        }
      }
    });

    return initialState;
  });

  // Add this useEffect to sync when activeFilters changes externally
  useEffect(() => {
    setDropdownState((prev) => {
      const newState = { ...prev };

      // Reset all selections first
      Object.keys(newState).forEach((key) => {
        newState[key].selected = null;
      });

      // Apply selections from activeFilters
      Object.entries(activeFilters).forEach(([key, id]) => {
        if (newState[key]) {
          const filter = filters.find((f) => f.key === key);
          if (filter) {
            const selectedOption = filter.options.find((opt) => opt.id === id);
            if (selectedOption) {
              newState[key].selected = selectedOption.name;
            }
          }
        }
      });

      return newState;
    });
  }, [activeFilters, filters]);

  // Toggle logic: open the clicked one, close others
  function toggleDropdown(key) {
    setOpenKey((prevKey) => (prevKey === key ? null : key));
    setDropdownState((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((k) => {
        newState[k].isOpen = k === key && openKey !== key;
      });
      return newState;
    });
  }

  // When selecting an option, close the menu
  function handleSelect(key, option, id) {
    setDropdownState((prev) => ({
      ...prev,
      [key]: { ...prev[key], selected: option, isOpen: false },
    }));
    setActiveFilters((prev) => ({
      ...prev,
      [key]: id,
    }));
    setOpenKey(null);
  }

  // Clear all filters
  function clearFilters() {
    setDropdownState(
      Object.fromEntries(
        filters.map(({ key }) => [key, { isOpen: false, selected: null }])
      )
    );
    setActiveFilters({});
    setOpenKey(null);
    // Clear from localStorage as well
    localStorage.removeItem("activeFilters");
  }

  // Update hasSelectedFilters to also check activeFilters
  const hasSelectedFilters =
    Object.values(dropdownState).some((filter) => filter.selected !== null) ||
    Object.keys(activeFilters).length > 0;

  return (
    <>
      <div className="hidden md:flex items-center">
        <Filters
          dropdownState={Object.fromEntries(
            filters.map(({ key }) => [
              key,
              {
                ...dropdownState[key],
                isOpen: openKey === key,
              },
            ])
          )}
          filters={filters}
          toggleDropdown={toggleDropdown}
          handleSelect={(key, name, id) => handleSelect(key, name, id)}
        />
        {hasSelectedFilters && (
          <div className="flex items-center">
            <span
              className="text-sm text-text-secondary cursor-pointer hover:underline hover:text-orange-accent"
              onClick={clearFilters}
            >
              Clear Filters
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col md:hidden justify-center">
        <Filters
          dropdownState={Object.fromEntries(
            filters.map(({ key }) => [
              key,
              {
                ...dropdownState[key],
                isOpen: openKey === key,
              },
            ])
          )}
          filters={filters}
          toggleDropdown={toggleDropdown}
          handleSelect={(key, name, id) => handleSelect(key, name, id)}
        />
        {hasSelectedFilters && (
          <div className="flex items-center">
            <span
              className="text-sm text-text-secondary cursor-pointer hover:underline mt-1 pl-5 hover:text-orange-accent"
              onClick={clearFilters}
            >
              Clear Filters
            </span>
          </div>
        )}
      </div>
    </>
  );
}

import FilterItem from "./FilterItem.jsx";

export default function Filters({
  dropdownState,
  toggleDropdown,
  handleSelect,
  filters,
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full relative">
        <div className="filters-bar flex md:flex-wrap overflow-x-auto scroll-smooth space-x-2 gap-y-2 pr-8 max-w-full">
          {filters.map(({ key, label, options }) => {
            const { isOpen, selected } = dropdownState[key];
            let widthClass = "";
            if (key === "topic") widthClass = "w-[180px]";
            else if (key === "accent") widthClass = "w-[180px]";
            else if (key === "level") widthClass = "w-[180px]";

            return (
              <div key={key} className={`flex-shrink-0 ${widthClass}`}>
                <FilterItem
                  label={label}
                  isOpen={isOpen}
                  selected={selected}
                  options={options}
                  onToggle={() => toggleDropdown(key)}
                  onSelect={(option, id) => {
                    handleSelect(key, option, id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

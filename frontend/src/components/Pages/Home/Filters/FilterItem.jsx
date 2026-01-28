import ChevronDown from "../../../../assets/ChevronDown";
import { createPortal } from "react-dom";
import { useRef, useState, useEffect } from "react";

export default function FilterItem({
  label,
  isOpen,
  selected,
  options,
  onToggle,
  onSelect,
  widthClass = "",
}) {
  const buttonRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  // Support both string and object options
  let sortedOptions = options;
  if (
    (label.toLowerCase() === "level" || label.toLowerCase() === "nivel") &&
    Array.isArray(options)
  ) {
    if (
      typeof options[0] === "object" &&
      options[0] !== null &&
      "name" in options[0]
    ) {
      sortedOptions = [...options].sort((a, b) => a.name.localeCompare(b.name));
    } else if (typeof options[0] === "string") {
      sortedOptions = [...options].sort((a, b) => a.localeCompare(b));
    }
  }

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const shouldShowDropdown = isOpen && dropdownPos.width > 0;

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        ref={buttonRef}
        onClick={onToggle}
        className={`filter-button ${widthClass} flex justify-between items-center w-full gap-2 px-4 cursor-pointer font-fun ${
          selected && !isOpen
            ? "bg-orange-accent text-white"
            : "bg-light-primary text-dark-primary"
        }`}
      >
        <span className="font-fun">{selected || label}</span>
        <ChevronDown />
      </button>

      {/* Dropdown Options */}
      {shouldShowDropdown &&
        createPortal(
          <div
            className="filter-open absolute z-50"
            style={{
              top: dropdownPos.top,
              left: dropdownPos.left,
              minWidth: dropdownPos.width,
              position: "absolute",
            }}
          >
            <ul
              className="text-dark-primary text-left px-0 max-h-48 overflow-y-scroll font-primary" // Always show scrollbar
            >
              {sortedOptions.map((option, idx) => {
                if (
                  typeof option === "object" &&
                  option !== null &&
                  "name" in option
                ) {
                  return (
                    <li
                      key={option.id || option.name || idx}
                      onClick={() => onSelect(option.name, option.id)}
                      className="filter-option w-full px-4 whitespace-nowrap"
                    >
                      {option.name}
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={option}
                      onClick={() => onSelect(option, option)}
                      className="filter-option w-full px-4 whitespace-nowrap"
                    >
                      {option}
                    </li>
                  );
                }
              })}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  );
}

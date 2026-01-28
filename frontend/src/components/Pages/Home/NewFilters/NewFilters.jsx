import FiltersContainer from "../Filters/FiltersContainer";
import { capitalizeFirstLetter } from "../../../../utilities/string";
import { useTranslation } from "react-i18next";

export default function NewFilters({ filterLists }) {
  const { t } = useTranslation("home");
  const filtersArray = filterLists.filters;

  // Create the new array of objects
  const filtersObjectArray = filtersArray.map((filter) => {
    return {
      key: filter.key,
      options: filter.values,
      label: t(`filters.${filter.key}`, {
        defaultValue: capitalizeFirstLetter(filter.key),
      }),
      width: calculateWidth(filter.key),
    };
  });

  function calculateWidth(key) {
    if (key === "topic") return "w-[180px]";
    if (key === "accent") return "w-[110px]";
    if (key === "level") return "w-[90px]";
    if (key === "guide") return "w-[120px]";
    if (key === "length") return "w-[100px]";
    if (key === "grammar_area") return "w-[90px]";
    return "w-[100px]"; // Default width
  }

  return (
    <div>
      <FiltersContainer filters={filtersObjectArray} />
    </div>
  );
}

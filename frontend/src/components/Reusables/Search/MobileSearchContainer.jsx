import MobileSearch from "./MobileSearch";
import { useContext } from "react";
import { SearchContext } from "../../../context/SearchContext";

export default function MobileSearchContainer({
  active,
  searchClickHandler,
  closeSearchHandler,
}) {
  const { setSearchQuery } = useContext(SearchContext);

  return (
    <MobileSearch
      active={active}
      clickHandler={searchClickHandler}
      onSearchChange={setSearchQuery}
      closeSearchHandler={closeSearchHandler}
    />
  );
}

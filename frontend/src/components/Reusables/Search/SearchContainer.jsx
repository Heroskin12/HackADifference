import { useContext } from "react";
import Search from "./Search";
import { SearchContext } from "../../../context/SearchContext";

export default function SearchContainer() {
  const { setSearchQuery } = useContext(SearchContext);

  return <Search onSearchChange={setSearchQuery} />;
}

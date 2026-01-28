import { createContext, useState, useEffect, useContext } from "react";
// TODO: Implement new API - import { fetchFilterResults } from "../api/search";
import { AuthContext } from "./AuthContext";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize activeFilters from localStorage with expiration check
  const [activeFilters, setActiveFilters] = useState(() => {
    try {
      const saved = localStorage.getItem("activeFilters");
      if (saved) {
        const data = JSON.parse(saved);
        const oneHourInMs = 60 * 60 * 1000; // 1 hour in milliseconds
        const isExpired = Date.now() - data.timestamp > oneHourInMs;

        if (isExpired) {
          localStorage.removeItem("activeFilters");
          return {};
        }

        return data.filters || {};
      }
      return {};
    } catch {
      localStorage.removeItem("activeFilters");
      return {};
    }
  });

  // Save activeFilters to localStorage with timestamp
  useEffect(() => {
    const filterData = {
      filters: activeFilters,
      timestamp: Date.now(),
    };
    localStorage.setItem("activeFilters", JSON.stringify(filterData));
  }, [activeFilters]);

  // Debounce logic: Set delay on search.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    // If search query changes before search ends.
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    // Don't fetch if auth is still loading
    if (authLoading) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await fetchFilterResults(debouncedQuery, activeFilters);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedQuery || Object.keys(activeFilters).length > 0) {
      fetchResults();
    }
  }, [debouncedQuery, activeFilters, isAuthenticated, authLoading]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        activeFilters,
        setActiveFilters,
        searchResults,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

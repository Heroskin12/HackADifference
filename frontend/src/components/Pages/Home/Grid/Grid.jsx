import React, { useContext } from "react";
import GridItem from "./GridItem";
import { SearchContext } from "../../../../context/SearchContext";

const Grid = React.memo(
  ({ data, hasMoreVideos, fetchNextVideos, loadingMore }) => {
    const { searchResults, searchQuery, activeFilters } =
      useContext(SearchContext); // Access activeFilters

    // Use searchResults if a query is active or filters are applied; otherwise, use the default data
    const gridData =
      (searchQuery || Object.keys(activeFilters).length > 0) &&
      searchResults.length > 0
        ? searchResults
        : data;

    return (
      <div>
        {searchResults.length === 0 &&
        (searchQuery || Object.keys(activeFilters).length > 0) ? (
          <div className="flex justify-center items-center text-center">
            <p className="text-center text-gray-500 mt-4 font-fun">
              No results found for your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {gridData.map((item, index) => (
              <GridItem key={index} item={item} />
            ))}
          </div>
        )}

        {!searchQuery &&
          !Object.keys(activeFilters).length &&
          hasMoreVideos && (
            <div className="flex justify-center">
              <button
                onClick={fetchNextVideos}
                disabled={loadingMore}
                className="mt-4 px-4 py-2 bg-orange-accent text-white rounded text-center cursor-pointer font-fun"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        {!searchQuery &&
          !Object.keys(activeFilters).length &&
          !hasMoreVideos && (
            <p className="my-4 pb-10 text-center text-gray-500 font-fun">
              No more videos
            </p>
          )}
      </div>
    );
  }
);

export default Grid;

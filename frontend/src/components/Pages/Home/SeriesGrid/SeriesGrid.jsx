import React from "react";
import SeriesGridItem from "./SeriesGridItem";

const SeriesGrid = React.memo(({ data }) => {
  const gridData = data;

  return (
    <>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 gap-y-8 p-4">
          {gridData.map((item, index) => (
            <SeriesGridItem key={item.id || index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
});

export default SeriesGrid;

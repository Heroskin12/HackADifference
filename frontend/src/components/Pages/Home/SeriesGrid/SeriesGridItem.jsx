import UserIconSmall from "../../../../assets/UserIconSmall";
import GridButton from "../../../Reusables/Buttons/GridButton";
import { memo } from "react";
import { useNavigate } from "react-router";
const SeriesGridItem = memo(({ item }) => {
  const { id, shortDescription, description, thumbnail, name } = item;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/series/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
    >
      <div className="w-full">
        <div
          className="bg-blue mb-3 transition-transform duration-200 hover:scale-105"
          style={{
            width: "100%",
            aspectRatio: "2 / 3",
            overflow: "hidden",
          }}
        >
          {thumbnail && (
            <img
              src={thumbnail}
              className="w-full h-full object-cover rounded-xl shadow-md"
              alt={`${item.name || "Series"} thumbnail`}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default SeriesGridItem;

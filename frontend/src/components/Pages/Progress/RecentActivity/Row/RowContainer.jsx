import { useState } from "react";
import { useTranslation } from "react-i18next";
import Row from "./Row";

export default function RowContainer({ recentActivityData }) {
  const [visibleCount, setVisibleCount] = useState(5); // Start by showing 1 activity
  const { t } = useTranslation("progress");

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Show one more activity
  };

  return (
    <>
      {recentActivityData.slice(0, visibleCount).map((activity, index) => (
        <Row key={index} activity={activity} />
      ))}
      {visibleCount < recentActivityData.length && (
        <button
          onClick={handleSeeMore}
          className="mt-4 px-4 py-2 bg-orange-accent text-white rounded-md cursor-pointer"
        >
          {t("activity.seeMore")}
        </button>
      )}
    </>
  );
}

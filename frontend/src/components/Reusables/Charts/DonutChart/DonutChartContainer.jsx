import { useState, useEffect } from "react";
import DonutChart from "./DonutChart";
import { useTranslation } from "react-i18next";

export default function DonutChartContainer({ categoryData }) {
  const [topics, setTopics] = useState([]);
  const { t } = useTranslation("progress");

  useEffect(() => {
    const getTopicLabels = () => {
      setTopics(categoryData.map((item) => item.topic));
    };

    if (categoryData && categoryData.length > 0) {
      getTopicLabels();
    }
  }, [categoryData]); // Runs only when categoryData changes

  return categoryData &&
    categoryData.length > 0 &&
    topics &&
    topics.length > 0 ? (
    <DonutChart topics={topics} categoryData={categoryData} />
  ) : (
    <div id="chart" className="py-2 flex-1">
      <div className=" bg-white rounded-sm border border-gray-200 pb-2">
        <h3 className="font-primary text-[18px] font-semibold p-4">
          {t("charts.watchTimeByCategory")}
        </h3>
        <hr className="border-[#A5A5A5]" />
        <div className="w-full h-[300px] p-4 px-10 text-center flex items-center justify-center">
          <p className="font-semibold">{t("charts.noData")}</p>
        </div>
      </div>
    </div>
  );
}

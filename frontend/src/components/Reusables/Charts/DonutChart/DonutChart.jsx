import Chart from "react-apexcharts";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function DonutChart({ topics, categoryData }) {
  const { t } = useTranslation("progress");
  const [state] = useState({
    series: categoryData.map((item) => item.minutes),
    options: {
      chart: {
        type: "donut",
        background: "white",
      },
      labels: topics,
      colors: ["#00bd35", "#ff4848", "#ddaa00", "#fccc42", "#ff5734"],
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart" className="py-2 flex-1">
      <div className="bg-white rounded-sm border border-gray-200 pb-2 py-4">
        <h3 className="font-primary text-[18px] font-semibold px-4">
          {t("charts.watchTimeByCategory")}
        </h3>
        <p className="text-text-secondary px-4 pb-4 text-[14px]">
          {t("charts.categoryDescription")}
        </p>
        <hr className="border-[#A5A5A5]" />
        <div className="w-full h-[300px]">
          <Chart
            options={state.options}
            series={state.series}
            type="donut"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Chart from "react-apexcharts";

export default function LineChart({ dailyWatchTimeData }) {
  const chartColor = "#ff5734"; // Define the color once

  const [state] = useState({
    series: [
      {
        name: "A view of how many minutes you watched each day this week.",
        data: dailyWatchTimeData.map((item) => ({
          x: item.day,
          y: item.minutes,
        })),
      },
    ],
    options: {
      chart: {
        type: "area",
        animations: { enabled: false },
        zoom: { enabled: false },
        toolbar: { show: false }, // Disable the toolbar (including the download button)
      },
      colors: [chartColor],
      dataLabels: { enabled: true, style: { colors: [chartColor] } },
      stroke: { curve: "smooth", colors: [chartColor] },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.7,
          gradientToColors: [chartColor],
          inverseColors: false,
          opacityFrom: 0.7,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      markers: {
        size: 5,
        colors: [chartColor],
        hover: { size: 9 },
      },

      tooltip: {
        intersect: true,
        shared: false,
      },
      responsive: [
        {
          breakpoint: 768,
          options: {},
        },
      ],
    },
  });

  return (
    <div id="chart" className="py-2 flex-1">
      {/* Chart Container */}
      <div className="bg-white rounded-sm border border-gray-200 pb-2 py-4">
        <h3 className="font-fun text-[18px] font-semibold px-4">
          Daily watch time
        </h3>
        <p className="font-primary text-text-secondary px-4 pb-4 text-[14px]">
          See how many minutes you have watched each day over the past week.
        </p>
        <hr className="border-[#A5A5A5]" />
        <div className="w-full h-[300px] p-2">
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}

import LineChart from "./LineChart";
import { useTranslation } from "react-i18next";

export default function LineChartContainer({ dailyWatchTimeData }) {
  const { t } = useTranslation("progress");

  return dailyWatchTimeData.length > 0 ? (
    <LineChart dailyWatchTimeData={dailyWatchTimeData} />
  ) : (
    <div id="chart" className="py-2 flex-1">
      {/* Chart Container */}
      <div className="bg-white rounded-sm border border-gray-200 pb-2">
        <h3 className="font-primary text-[18px] font-semibold p-4">
          {t("charts.dailyWatchTime")}
        </h3>
        <hr className="border-[#A5A5A5]" />
        <div className="w-full h-[300px] p-4 px-10 text-center flex items-center justify-center">
          <p className="font-semibold">{t("charts.noData")}</p>
        </div>
      </div>
    </div>
  );
}

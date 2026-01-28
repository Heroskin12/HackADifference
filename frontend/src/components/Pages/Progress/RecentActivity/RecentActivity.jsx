import RowContainer from "./Row/RowContainer";
import { useTranslation } from "react-i18next";

export default function RecentActivity({ recentActivityData }) {
  const { t } = useTranslation("progress");

  return (
    <div className="md:p-4 p-2">
      <div className="rounded-sm bg-white my-2 border border-gray-200">
        <h3 className="font-primary text-[18px] font-semibold p-4">
          {t("recentActivity.title")}
        </h3>
        <hr className="border-[#A5A5A5]" />
        <div className="flex flex-col py-4 px-4 w-full">
          {/* Individual Row */}
          {recentActivityData.length === 0 ? (
            <div className="w-full h-[300px] p-4 px-10 text-center flex items-center justify-center">
              <p className="font-semibold">{t("recentActivity.noActivity")}</p>
            </div>
          ) : (
            <RowContainer recentActivityData={recentActivityData} />
          )}
        </div>
      </div>
    </div>
  );
}

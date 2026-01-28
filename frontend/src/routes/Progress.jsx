import { useTranslation } from "react-i18next";

export default function Progress() {
  const { t } = useTranslation("progress");
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
      <h1 className="text-2xl font-fun font-bold mt-10">
        {t("progressRemoved", "Progress tracking is disabled in this demo.")}
      </h1>
    </div>
  );
}

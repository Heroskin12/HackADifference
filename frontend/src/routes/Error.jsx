import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function Error() {
  const navigate = useNavigate();
  const { t } = useTranslation("error");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light-primary">
      <h1 className="text-[24px] font-fun font-bold text-dark-primary">
        {t("title")}
      </h1>
      <p className="text-[16px] font-primary text-text-secondary mt-2">
        {t("message")}
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-2 bg-orange-accent text-white rounded-md hover:bg-orange-dark"
      >
        {t("goHome")}
      </button>
    </div>
  );
}

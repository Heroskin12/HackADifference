import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import ProgressGoalContainer from "../components/Reusables/ProgressGoal/ProgressGoalContainer";
import AltHeader from "../components/Reusables/Headers/AltHeader/AltHeader";
import OutsideHoursContainer from "../components/Reusables/OutsideHours/OutsideHoursContainer";
import { useTranslation } from "react-i18next";

export default function User() {
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const { t } = useTranslation("user");

  return (
    <div className="min-h-screen-bg-white">
      <AltHeader />
      <div className="p-4">
        <h1 className="text-[18px] font-heading font-semibold">{t("title")}</h1>
        <p className="text-text-secondary text-[14px] font-primary">
          {t("welcomeBack")}
          {userInfo?.name && userInfo.name.trim()
            ? `, ${userInfo.name.trim().split(" ")[0]}`
            : ""}
          ! {t("subtitle")}
        </p>
        <hr className="border-[#A5A5A5] my-2" />
        <div className="flex flex-col">
          <div className="flex flex-col space-y-4 w-[50%]">
            <div className="flex flex-col">
              <h3 className="text-secondary font-semibold font-fun">
                {t("yourName")}
              </h3>
              <p className="font-primary">
                {userInfo?.name || t("notAuthenticated")}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-secondary font-semibold font-fun">
                {t("yourEmail")}
              </h3>
              <p className="font-primary">
                {userInfo.email || t("notAuthenticated")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

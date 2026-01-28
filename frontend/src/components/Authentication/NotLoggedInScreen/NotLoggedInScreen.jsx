import { useLocation } from "react-router";
import ErrorIcon from "../../../assets/ErrorIcon";
import ErrorIconMobile from "../../../assets/ErrorIconMobile";
import { useTranslation } from "react-i18next";

export default function NotLoggedInScreen() {
  const location = useLocation();
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-row justify-center items-center w-full h-[50vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="md:block hidden">
          <ErrorIcon />
        </div>
        <div className="md:hidden block">
          <ErrorIconMobile />
        </div>
        <h1 className="font-heading md:text-[28px] text-[20px] text-center">
          {location.pathname == "/progress" && t("auth.mustLoginProgress")}
          {location.pathname.startsWith("/settings") &&
            t("auth.mustLoginSettings")}
        </h1>
      </div>
    </div>
  );
}

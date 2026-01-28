import { useContext } from "react";
import LogoBar from "../../Logo/LogoBar.jsx";
import LogoBarSmall from "../../Logo/LogoBarSmall.jsx";
import ModalButton from "../../Buttons/ModalButton.jsx";
import ProgressBar from "../../ProgressBar/ProgressBar.jsx";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

export default function AltHeader() {
  const { t } = useTranslation("common");
  const { t: tCommon } = useTranslation("common");

  const { isAuthenticated, userInfo } = useContext(AuthContext);

  return (
    <>
      <div>
        {/* Large Screen */}
        <div className="hidden lg:flex flex-row items-center justify-between px-4">
          <LogoBar />

          {isAuthenticated ? (
            <div className="flex items-center space-x-2.5 text-right pl-4">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  {isAuthenticated && (
                    <p className="font-roboto text-dark-primary text-[14px]">
                      {userInfo?.name && userInfo.name.trim()
                        ? `${tCommon("welcomeBack")}, ${
                            userInfo.name.trim().split(" ")[0]
                          }!`
                        : `${tCommon("welcomeBack")}!`}
                    </p>
                  )}
                </div>
              </div>
              <ModalButton type="logout">{t("buttons.logout")}</ModalButton>
            </div>
          ) : (
            <div className="flex justify-between md:space-x-2.5">
              <ModalButton type="login">{t("buttons.login")}</ModalButton>
              <ModalButton type="signup">{t("buttons.signup")}</ModalButton>
            </div>
          )}
        </div>
      </div>

      {/* Medium Screen */}
      <div className="flex lg:hidden flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoBarSmall />
          {isAuthenticated && (
            <p className="font-roboto text-dark-primary text-[14px]">
              {tCommon("welcomeBack")}
              {userInfo?.name && userInfo.name.trim()
                ? `, ${userInfo.name.trim().split(" ")[0]}`
                : ""}
              !
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between items-center h-[52px]">
          {isAuthenticated ? (
            <div className="px-4">
              <ModalButton type="logout">{t("buttons.logout")}</ModalButton>
            </div>
          ) : (
            <div className="flex justify-between space-x-2.5 px-4">
              <ModalButton type="login">{t("buttons.login")}</ModalButton>
              <ModalButton type="signup">{t("buttons.signup")}</ModalButton>
            </div>
          )}
        </div>
      </div>

      {/* Second row of header. */}
      <div className="flex flex-col px-4 w-full space-y-3">
        <ProgressBar progress={20} />
      </div>
    </>
  );
}

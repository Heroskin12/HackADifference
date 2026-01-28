import { useContext, useEffect, useState } from "react";
import LogoBar from "../../Logo/LogoBar.jsx";
import LogoBarSmall from "../../Logo/LogoBarSmall.jsx";
import ModalButton from "../../Buttons/ModalButton.jsx";
import ProgressBar from "../../ProgressBar/ProgressBar.jsx";
import FlagLanguageSwitcher from "../../LanguageSwitcher/FlagLanguageSwitcher.jsx";
import MobileFlagLanguageSwitcher from "../../LanguageSwitcher/MobileFlagLanguageSwitcher.jsx";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import CrownIcon from "../../../../assets/CrownIcon.jsx";
// TODO: Implement new API - import { getPaymentInfo } from "../../../../api/membership.js";
import { useTranslation } from "react-i18next";

export default function AltHeader() {
  const { t } = useTranslation("common");
  const { t: tCommon } = useTranslation("common");
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isLoadingPaymentInfo, setIsLoadingPaymentInfo] = useState(false);

  const CrownWithTooltip = () => (
    <div className="relative group">
      <CrownIcon width="20px" height="20px" style={{ color: "#FFD700" }} />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Premium Member
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );

  const { isAuthenticated, userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (isAuthenticated && userInfo?.subscriptionTier == 2) {
        setIsLoadingPaymentInfo(true);
        try {
          const info = await getPaymentInfo();
          // For now, use hardcoded date since backend isn't ready
          setPaymentInfo(info || "30 days");
        } catch (error) {
          console.error("Error fetching payment info:", error);
          // Fallback to hardcoded date if API fails
          setPaymentInfo("30 days");
        } finally {
          setIsLoadingPaymentInfo(false);
        }
      }
    };

    fetchPaymentInfo();
  }, [isAuthenticated, userInfo?.subscriptionTier]);

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
                  {userInfo?.subscriptionTier == 2 && <CrownWithTooltip />}
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
          <MobileFlagLanguageSwitcher />
          {userInfo?.subscriptionTier == 2 && <CrownWithTooltip />}
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
        {/* Desktop language switcher */}
        <div className="hidden lg:block">
          <FlagLanguageSwitcher />
        </div>
      </div>
    </>
  );
}

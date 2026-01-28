import LogoBar from "../../Logo/LogoBar.jsx";
import LogoBarSmall from "../../Logo/LogoBarSmall.jsx";
import SearchContainer from "../../Search/SearchContainer.jsx";
import ModalButton from "../../Buttons/ModalButton.jsx";
import ProgressBar from "../../ProgressBar/ProgressBar.jsx";
import FlagLanguageSwitcher from "../../LanguageSwitcher/FlagLanguageSwitcher.jsx";
import MobileFlagLanguageSwitcher from "../../LanguageSwitcher/MobileFlagLanguageSwitcher.jsx";
import CrownIcon from "../../../../assets/CrownIcon.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { getPaymentInfo } from "../../../../api/membership.js";
import { useTranslation } from "react-i18next";

export default function HomeHeader() {
  const { t } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isLoadingPaymentInfo, setIsLoadingPaymentInfo] = useState(false);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (isAuthenticated && userInfo?.subscriptionTier == 2) {
        setIsLoadingPaymentInfo(true);
        try {
          const info = await getPaymentInfo();
          // For now, use hardcoded date since backend isn't ready
          if (info === "") {
            return;
          }
          setPaymentInfo(info);
        } catch (error) {
          // Error fetching payment info
        } finally {
          setIsLoadingPaymentInfo(false);
        }
      }
    };

    fetchPaymentInfo();
  }, [isAuthenticated, userInfo?.subscriptionTier]);

  const CrownWithTooltip = () => (
    <div className="relative group">
      <CrownIcon width="20px" height="20px" style={{ color: "#FFD700" }} />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Premium Member
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        {/* Large Screen */}
        <div className="hidden xl:flex flex-row items-center justify-between px-4">
          <LogoBar />

          <div className="flex flex-row justify-between items-center w-[700px] h-[52px]">
            <SearchContainer />
            {isAuthenticated ? (
              <div className="flex items-center space-x-2.5 text-right pl-4">
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center justify-center">
                    {userInfo?.subscriptionTier == 2 && <CrownWithTooltip />}
                    {isAuthenticated && (
                      <p className="font-fun text-dark-primary text-[14px] text-nowrap">
                        {userInfo?.name && userInfo.name.trim()
                          ? `${tCommon("welcomeBack")}, ${
                              userInfo.name.trim().split(" ")[0]
                            }!`
                          : `${tCommon("welcomeBack")}!`}
                      </p>
                    )}
                  </div>
                </div>
                <ModalButton type="logout">
                  {tCommon("buttons.logout")}
                </ModalButton>
              </div>
            ) : (
              <div className="flex justify-between md:space-x-2.5">
                <ModalButton type="login">
                  {tCommon("buttons.login")}
                </ModalButton>
                <ModalButton type="signup">
                  {tCommon("buttons.signup")}
                </ModalButton>
              </div>
            )}
          </div>
        </div>

        {/* Medium Screen */}
        <div className="flex xl:hidden flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoBarSmall />
            {userInfo?.subscriptionTier == 2 && <CrownWithTooltip />}
            {isAuthenticated && (
              <p className="font-fun text-dark-primary text-[14px]">
                {tCommon("welcomeBack")}, {userInfo?.name?.split(" ")[0]}!
              </p>
            )}
          </div>

          <div className="flex flex-row justify-between items-center h-[52px]">
            <SearchContainer />
            {isAuthenticated ? (
              <div className="px-4">
                <ModalButton type="logout">
                  {tCommon("buttons.logout")}
                </ModalButton>
              </div>
            ) : (
              <div className="flex justify-between space-x-2.5 px-4">
                <ModalButton type="login">
                  {tCommon("buttons.login")}
                </ModalButton>
                <ModalButton type="signup">
                  {tCommon("buttons.signup")}
                </ModalButton>
              </div>
            )}
          </div>
        </div>

        {/* Second row of header. */}
        <div className="flex flex-col px-4 w-full">
          <div className="mb-3">
            {/* Desktop language switcher */}
            <div className="hidden lg:block">
              <FlagLanguageSwitcher />
            </div>
            {/* Mobile language switcher */}
            <div className="lg:hidden flex justify-end">
              <MobileFlagLanguageSwitcher />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center w-full items-center">
            <h1 className="text-hero whitespace-nowrap px-0">
              {t("header.latestVideos")}
            </h1>
          </div>
          <ProgressBar />
        </div>
      </div>
    </>
  );
}

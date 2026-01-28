import LogoBar from "../../Logo/LogoBar.jsx";
import LogoBarSmall from "../../Logo/LogoBarSmall.jsx";
import SearchContainer from "../../Search/SearchContainer.jsx";
import ModalButton from "../../Buttons/ModalButton.jsx";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

export default function HomeHeader() {
  const { t } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");
  const { isAuthenticated, userInfo } = useContext(AuthContext);

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
          <div className="flex flex-row gap-4 w-full items-center">
            <h1 className="text-hero whitespace-nowrap px-0">
              {t("header.latestVideos")}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

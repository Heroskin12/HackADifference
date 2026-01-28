import MobileSearchContainer from "../../Search/MobileSearchContainer";
import LogoBarSmall from "../../Logo/LogoBarSmall";
import ModalButton from "../../Buttons/ModalButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import CloseIcon from "../../../../assets/CloseIcon.jsx";
import MobileSearchInactive from "../../Search/MobileSearchInactive.jsx";
import { SearchContext } from "../../../../context/SearchContext.jsx";
import CrownIcon from "../../../../assets/CrownIcon.jsx";
import { useTranslation } from "react-i18next";
export default function MobileHomeHeader() {
  const { t } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const { setSearchQuery } = useContext(SearchContext);

  const searchClickHandler = () => {
    setActive((prev) => !prev);
  };

  const closeSearchHandler = () => {
    setActive((prev) => !prev);
    setSearchQuery("");
  };

  return (
    <div className="pt-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LogoBarSmall />
          {isAuthenticated && (
            <p className="font-fun text-dark-primary text-[14px]">
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
            <div className="flex items-center space-x-2.5 px-4">
              <ModalButton type="logout">
                {tCommon("buttons.logout")}
              </ModalButton>
            </div>
          ) : (
            <div className="flex justify-between space-x-2.5 px-4">
              <ModalButton type="login">{tCommon("buttons.login")}</ModalButton>
              <ModalButton type="signup">
                {tCommon("buttons.signup")}
              </ModalButton>
            </div>
          )}
        </div>
      </div>
      <div className="flex  justify-between items-center pr-4">
        <h1 className="text-page-title whitespace-nowrap px-4">
          {t("header.latestVideos")}
        </h1>
        {!active && <MobileSearchInactive clickHandler={searchClickHandler} />}
      </div>
      <div className="w-full flex justify-center pb-2">
        {active && (
          <MobileSearchContainer
            active={active}
            searchClickHandler={searchClickHandler}
            closeSearchHandler={closeSearchHandler}
          />
        )}
      </div>
    </div>
  );
}

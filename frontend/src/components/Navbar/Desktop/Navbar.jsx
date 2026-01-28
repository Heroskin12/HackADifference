import { NavLink, useLocation } from "react-router";
import CollapseIcon from "../../../assets/NavIcons/CollapseIcon.jsx";
import { navItems } from "../navItems.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar({ collapseHandler, isExpanded }) {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation("common");

  function renderCollapsedNavItems(items) {
    return items.map(({ name, route, Icon }) => (
      <NavLink key={name} to={route}>
        <div
          className={`${
            location.pathname === route ? "bg-yellow-accent" : ""
          } nav-link-desktop-collapsed`}
        >
          {Icon && <Icon active={location.pathname === route} />}
        </div>
      </NavLink>
    ));
  }

  function renderUncollapsedNavItems(items) {
    return items.map(({ name, translationKey, route, Icon }) => (
      <NavLink key={name} to={route}>
        <div
          className={`nav-link-desktop-uncollapsed transition-all duration-700
            ${
              location.pathname === route
                ? "bg-yellow-accent text-dark-primary"
                : "text-light-primary"
            }
          `}
        >
          {Icon && <Icon active={location.pathname === route} />}
          <span className="ml-4 transition-all duration-700 opacity-100 font-fun whitespace-nowrap">
            {t(`navigation.${translationKey}`)}
          </span>
        </div>
      </NavLink>
    ));
  }

  return (
    <div className="h-full py-[45px] flex flex-col justify-between">
      <div className="flex flex-col space-y-[32px] items-center">
        <div
          onClick={() => collapseHandler()}
          className="rounded-sm cursor-pointer transition-transform duration-300 hover:rotate-45"
        >
          <CollapseIcon />
        </div>
        {isExpanded
          ? renderUncollapsedNavItems(navItems)
          : renderCollapsedNavItems(navItems)}
      </div>

      {/* Lower Navbar Items */}
      {/* {isAuthenticated && (
        <div className="flex flex-col items-center space-y-[32px] cursor-pointer space-x-0">
          {isExpanded
            ? renderUncollapsedNavItems(navLogout)
            : renderCollapsedNavItems(navLogout)}
        </div>
      )} */}
    </div>
  );
}

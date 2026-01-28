import { NavLink, useLocation } from "react-router";
import CollapseIcon from "../../../assets/NavIcons/CollapseIcon.jsx";
import { navItems } from "../navItems.js";
import { useTranslation } from "react-i18next";

export default function Navbar({ collapseHandler, isExpanded }) {
  const location = useLocation();
  const { t } = useTranslation("common");

  function renderCollapsedNavItems(items) {
    return items.map(({ name, route, Icon }) => (
      <NavLink key={name} to={route}>
        <div
          className={`${
            location.pathname === route ? "bg-[#B39B66]" : ""
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
                ? "bg-[#B39B66] text-light-primary"
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
    <div className="h-full py-[45px] flex flex-col justify-between bg-[#262E3C]">
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
    </div>
  );
}

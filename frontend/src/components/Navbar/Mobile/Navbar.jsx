import { NavLink, useLocation } from "react-router";
import { navItems } from "../navItems.js";

export default function Navbar() {
  const location = useLocation();

  function renderNavItems(items) {
    return items.map(({ name, route, Icon }) => (
      <NavLink key={name} to={route}>
        <div
          className={`${
            location.pathname === route ? "bg-yellow-accent" : ""
          } nav-link-mobile`}
        >
          {Icon && <Icon active={location.pathname === route} />}
        </div>
      </NavLink>
    ));
  }

  return (
    <div className="h-[73px] flex flex-row justify-center py-0">
      <div className="relative flex flex-row items-center space-y-0 space-x-[32px]">
        {renderNavItems(navItems)}
      </div>
    </div>
  );
}

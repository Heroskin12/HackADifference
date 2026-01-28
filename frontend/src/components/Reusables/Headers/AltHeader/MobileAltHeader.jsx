import LogoBarSmall from "../../Logo/LogoBarSmall";
import MobileFlagLanguageSwitcher from "../../LanguageSwitcher/MobileFlagLanguageSwitcher.jsx";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";

export default function MobileAltHeader() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="pt-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LogoBarSmall />
          <MobileFlagLanguageSwitcher />
        </div>
      </div>
      {/* Second row of header. */}
    </div>
  );
}

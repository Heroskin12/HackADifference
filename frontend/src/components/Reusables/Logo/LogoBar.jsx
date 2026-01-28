import Logo from "../../../assets/StreetLeagueLogo.png";
import { useTranslation } from "react-i18next";

export default function LogoBar() {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="xl:flex items-center text-dark-primary hidden">
        <img src={Logo} alt="Street League Logo" className="h-24 w-48" />
      </div>
      <div className="flex items-center text-dark-primary xl:hidden">
        <img src={Logo} alt="English Sponge Logo" className="h-24 w-24" />
        <p
          className="whitespace-nowrap font-bold ml-[-15px] font-heading"
          style={{
            fontSize: "clamp(20px, .5vw, 21px)", // Smoothly transitions from 24px to 34px
          }}
        >
          {t("logo.englishSpongeShort")}
        </p>
      </div>
    </>
  );
}

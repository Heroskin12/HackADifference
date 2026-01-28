import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switcher flex items-center space-x-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded ${
          i18n.language === "en"
            ? "bg-orange-accent text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("es")}
        className={`px-3 py-1 rounded ${
          i18n.language === "es"
            ? "bg-orange-accent text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        ES
      </button>
    </div>
  );
}

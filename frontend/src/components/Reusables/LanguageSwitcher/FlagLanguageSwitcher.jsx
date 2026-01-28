import { useTranslation } from "react-i18next";

export default function FlagLanguageSwitcher() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");

  const languages = [
    {
      code: "en",
      flag: "🇬🇧",
      name: "English",
    },
    {
      code: "es",
      flag: "🇪🇸",
      name: "Español",
    },
    {
      code: "ja",
      flag: "🇯🇵",
      name: "日本語",
    },
    {
      code: "pt",
      flag: "🇵🇹",
      name: "Português",
    },
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 mr-2">
        {t("navigation.language")}:
      </span>
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${
            i18n.language === language.code
              ? "bg-orange-accent text-white ring-2 ring-orange-accent hover:bg-orange-600"
              : "bg-gray-50 hover:bg-gray-200 text-gray-700"
          }`}
          title={`Switch to ${language.name}`}
        >
          <span className="text-lg">{language.flag}</span>
          <span className="text-sm font-medium">
            {language.code.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
}

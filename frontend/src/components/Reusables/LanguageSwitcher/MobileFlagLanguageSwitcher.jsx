import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import GlobeIcon from "../../../assets/GlobeIcon.jsx";
import ChevronDown from "../../../assets/ChevronDown.jsx";

export default function MobileFlagLanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        title={`Current language: ${currentLanguage.name}`}
      >
        <GlobeIcon width="16" height="16" />
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                i18n.language === language.code
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700"
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium whitespace-nowrap">
                {language.name}
              </span>
              {i18n.language === language.code && (
                <div className="ml-auto w-2 h-2 bg-orange-accent rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

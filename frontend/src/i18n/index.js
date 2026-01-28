import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  // Load translation using http -> see /public/locales (i.e. https://localhost:3000/locales/en/translation.json)
  .use(HttpApi)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Default language
    fallbackLng: "en",

    // Supported languages
    supportedLngs: ["en", "es", "ja", "pt"],

    // Debug mode (set to false in production)
    debug: false,

    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Language detection options
    detection: {
      // Order of language detection methods
      order: ["localStorage", "navigator", "htmlTag"],

      // Cache the language in localStorage
      caches: ["localStorage"],

      // Exclude certain languages from detection
      excludeCacheFor: ["cimode"],
    },

    // Backend options for loading translation files
    backend: {
      // Path where resources get loaded from
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    // Namespace settings
    defaultNS: "common",
    ns: [
      "common",
      "home",
      "auth",
      "about",
      "settings",
      "progress",
      "user",
      "error",
      "video",
      "series",
      "payment",
      "level",
    ],

    // React options
    react: {
      // Trigger a rerender when language changes
      bindI18n: "languageChanged",
      // Trigger a rerender when namespace changes
      bindI18nStore: "",
      // Enable Suspense for async translations
      useSuspense: true,
    },
  });

export default i18n;

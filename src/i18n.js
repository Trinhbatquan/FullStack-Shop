import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend"; // *** added this ***

const language = localStorage.getItem("i18nextLng");
i18n
  .use(HttpBackend) // *** added this ***
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true,
    lng: language || "en",
    fallbackLng: "en",
    supportedLngs: ["vi", "en"], // *** added this ***
    ns: ["translations"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // backend: {
    //     loadPath: `http://localhost:3001/public/{{ns}}/{{lng}}.json`,
    // },
  });

export default i18n;

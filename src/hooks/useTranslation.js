import en from "../locales/en";
import ar from "../locales/ar";
import { useLanguage } from "../context/LanguageContext";

export const useTranslation = () => {
  const { language } = useLanguage();

  const translations = {
    en,
    ar,
  };

  return translations[language];
};

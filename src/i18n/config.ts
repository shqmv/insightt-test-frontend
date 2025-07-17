import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.json';
import en from './locales/en.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

/**
 * Array of supported language codes.
 *
 * @constant
 * @type {string[]}
 *
 * @description
 * Contains the list of languages configured in the i18n instance,
 * which can be used in language switchers or settings menus.
 */
export const availableLanguages = Object.keys(resources);

/**
 * Initializes internationalization using i18next and react-i18next.
 *
 * @function
 * @returns {void}
 *
 * @description
 * Sets up i18n with language resources and configuration. The selected language
 * is retrieved from localStorage (key: `i18nLang`) or defaults to English (`en`).
 * If the selected language is not available, it falls back to Spanish (`es`).
 *
 * It supports switching between English and Spanish, and provides translations
 * for use throughout the application via the `useTranslation` hook or `t` function.
 */
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nLang') || 'en', // Default language
    fallbackLng: 'es'
  });

export default i18n;
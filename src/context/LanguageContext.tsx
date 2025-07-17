/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';

import { availableLanguages } from '@/i18n/config';

/**
 * Interface for the language context values.
 *
 * @interface LanguageContextType
 * @property {string} language - The currently selected language code (e.g., 'en', 'es').
 * @property {(lang: string) => void} setLanguage - Function to update the selected language.
 * @property {string[]} availableLanguages - List of supported language codes.
 */
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
}

/**
 * React context for managing the application language.
 *
 * @constant
 * @type {React.Context<LanguageContextType | undefined>}
 *
 * @description
 * Provides the current language, a function to change it, and the list of available languages.
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * LanguageProvider component that wraps the app and provides language context.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The components that will have access to the language context.
 * @returns {JSX.Element} The provider component with initialized language context.
 *
 * @description
 * Initializes the language from localStorage (defaulting to 'es') and persists changes.
 * Updates the i18n language whenever the `language` state changes.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to access the language context.
 *
 * @function
 * @returns {LanguageContextType} The current language context.
 * @throws Will throw an error if used outside of a `LanguageProvider`.
 *
 * @description
 * Allows components to read and update the selected language, and access the list of available languages.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
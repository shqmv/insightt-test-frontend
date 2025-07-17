import { useTranslation } from "react-i18next";

import { useLanguage } from "@/context/LanguageContext";

/**
 * LanguageSelector component for switching application languages.
 *
 * @component
 * @returns {JSX.Element} A select dropdown UI that allows the user to change the current language.
 *
 * @description
 * Uses the `useLanguage` custom hook to access and update the selected language, and `useTranslation` from i18n for translations.
 * Renders a `<select>` element populated with available languages. When a user selects a language,
 * the `setLanguage` function updates the current language in the application.
 *
 * @accessibility
 * - The select element uses `aria-label` for screen readers.
 */
export const LanguageSelector = () => {
  const { t } = useTranslation();
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <div className="d-flex justify-content-between mb-3 align-items-center">
      <label className="fw-medium text-dark" style={{ whiteSpace: "nowrap" }}>
        {t("language.title")}
      </label>
      <select
        className="form-select w-50"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label={t("language.select")}
      >
        <option value="" disabled>{t("language.select")}</option>
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {t(`language.${lang}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
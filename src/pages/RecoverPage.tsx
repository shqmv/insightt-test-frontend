import { ToastContainer } from "react-toastify";
import { t } from "i18next";

import { useRecover } from "@/pages/hooks/useRecover";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function RecoverPage() {

  const { handleSubmit, setEmail, email } = useRecover();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
        <div className="col-12">
          {/* Title */}
          <div className="text-center mx-auto mb-4" style={{ maxWidth: "384px" }}>
            <h2 className="fw-bold text-dark mb-0 fs-2">{t("recover.title")}</h2>
          </div>

          {/* Form */}
          <div className="mx-auto border rounded p-4 shadow-sm bg-white" style={{ minWidth: "400px" }}>
            {/* Language selector */}
            <LanguageSelector />

            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="email" className="form-label fw-medium text-dark mb-0">
                    {t("recover.email")}
                  </label>
                </div>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("recover.email_placeholder")}
                  required
                />
              </div>

              {/* Submit button */}
              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100 fw-semibold">
                  {t("recover.recover_button")}
                </button>
              </div>
            </form>

            {/* Login */}
            <p className="text-center text-muted small mb-0">
              {t("recover.account")}{" "}
              <a href="/login" className="text-decoration-none text-primary fw-semibold">
                {t("recover.login")}
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
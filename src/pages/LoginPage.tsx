import { t } from "i18next";
import { ToastContainer } from "react-toastify";

import { useLogin } from "@/pages/hooks/useLogin";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function LoginPage() {

  const { handleSubmit, password, setPassword, setEmail, email } = useLogin();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
        <div className="col-12">
          {/* Title */}
          <div className="text-center mx-auto mb-4" style={{ maxWidth: "384px" }}>
            <h2 className="fw-bold text-dark mb-0 fs-2">{t("login.title")}</h2>
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
                    {t("login.email")}
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
                  placeholder={t("login.email_placeholder")}
                  required
                />
              </div>

              {/* Password field */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="password" className="form-label fw-medium text-dark mb-0">
                    {t("login.password")}
                  </label>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.password_placeholder")}
                  required
                />
              </div>
              <div className="mb-3">
                <a href="/recover" className="text-decoration-none text-primary fw-semibold small">
                  {t("login.forgot_details")}
                </a>
              </div>

              {/* Submit button */}
              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100 fw-semibold">
                  {t("login.login_button")}
                </button>
              </div>
            </form>

            {/* Register */}
            <p className="text-center text-muted small mb-0">
              {t("login.no_account")}{" "}
              <a href="/register" className="text-decoration-none text-primary fw-semibold">
                {t("login.register")}
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
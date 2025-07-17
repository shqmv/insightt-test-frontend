import { t } from 'i18next';
import { ToastContainer } from 'react-toastify';

import { useRegister } from '@/pages/hooks/useRegister';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function RegisterPage() {

  const { handleSubmit, password, setPassword, setEmail, email } = useRegister();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
        <div className="col-12">
          {/* Title */}
          <div className="text-center mx-auto mb-4" style={{ maxWidth: "384px" }}>
            <h2 className="fw-bold text-dark mb-0 fs-2">{t("register.title")}</h2>
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
                  placeholder={t("register.email_placeholder")}
                  required
                />
              </div>

              {/* Password field */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="password" className="form-label fw-medium text-dark mb-0">
                    {t("register.password")}
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
                  placeholder={t("register.password_placeholder")}
                  minLength={6}
                  required
                />
              </div>

              {/* Submit button */}
              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100 fw-semibold">
                  {t("register.register_button")}
                </button>
              </div>
            </form>

            {/* Login */}
            <p className="text-center text-muted small mb-0">
              {t("register.account")}{" "}
              <a href="/login" className="text-decoration-none text-primary fw-semibold">
                {t("register.login")}
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
import { t } from "i18next";
import { ToastContainer } from "react-toastify";

import { LanguageSelector } from "@/components/LanguageSelector";
import { useHome } from "@/pages/hooks/useHome";

export default function HomePage() {
  const {
    tasks,
    formData,
    showForm,
    editingTask,
    logout,
    setShowForm,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleStatusEdit,
    cancelForm
  } = useHome();

  return (
    <div className="container-fluid border p-4">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-12" style={{ minWidth: "600px", maxWidth: "600px" }}>
          {/* Title and "Add Task" button */}
          <div className="text-center mx-auto mb-4"> {/* <-- Aquí se añade mb-4 */}
            <h2 className="fw-bold text-dark fs-2">{t("home.title")}</h2>
            <button className="btn btn-primary fw-semibold" onClick={() => setShowForm(true)}>
              {t("home.add_task_button")}
            </button>
          </div>

          {/* Form to Edit / Add task */}
          {showForm && (
            <div className="mx-auto border rounded p-4 shadow-sm bg-white mb-4">
              <h5 className="fw-bold text-dark">{editingTask ? t("home.modify") : t("home.new_task")}</h5>
              <form onSubmit={handleSubmit} className="row d-flex gap-2">
                <div className="gap-4">
                  <label htmlFor="title" className="form-label fw-medium text-dark">
                    {t("home.new_task_title")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder={t("home.new_task_title_placeholder")}
                    minLength={3}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary fw-semibold">
                    {editingTask ? t("home.modify") : t("home.create")}
                  </button>
                  <button type="button" className="btn btn-secondary fw-semibold" onClick={cancelForm}>
                    {t("home.cancel")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Task list */}
          <div className="mx-auto mb-4" style={{ maxHeight: "200px", overflowX: "hidden" }}>
            {tasks.length === 0 ? (
              <div className="text-center py-5">{t("home.no_tasks")}</div>
            ) : (
              <div className="row g-3">
                {tasks.map((task) => (
                  <div key={task._id} className="col-12">
                    <div className="border rounded p-4 shadow-sm bg-white">
                      <div className="d-flex align-items-start">
                        <div className="d-flex flex-column w-100">
                          <div className="d-flex flex-wrap align-items-start">
                            <input
                              type="checkbox"
                              className="form-check-input me-3 mt-1"
                              checked={task.done}
                              onChange={() => handleStatusEdit(task)}
                            />
                            <h5
                              className={`mb-0 ${task.done ? "text-decoration-line-through text-muted" : "text-dark"}`}
                              style={{ wordBreak: "break-word", flex: 1 }}
                            >
                              {task.title}
                            </h5>
                          </div>
                          <small className="text-muted mt-1">
                            {t("home.created_at")}: {new Date(task.createdAt).toLocaleDateString()}
                          </small>
                        </div>

                        <div className="d-flex gap-2 ms-auto">
                          <button
                            className="btn btn-outline-primary btn-sm fw-semibold"
                            onClick={() => handleEdit(task)}
                          >
                            {t("home.modify")}
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm fw-semibold"
                            onClick={() => handleDelete(task._id)}
                          >
                            {t("home.delete")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="mx-auto border rounded p-4 shadow-sm bg-white mb-4">
            <div className="row text-center">
              <div className="col-4">
                <h6 className="fw-bold text-primary">{tasks.length}</h6>
                <small className="text-muted">{t("home.total")}</small>
              </div>
              <div className="col-4">
                <h6 className="fw-bold text-success">{tasks.filter((t) => t.done).length}</h6>
                <small className="text-muted">{t("home.completed")}</small>
              </div>
              <div className="col-4">
                <h6 className="fw-bold text-warning">{tasks.filter((t) => !t.done).length}</h6>
                <small className="text-muted">{t("home.pending")}</small>
              </div>
            </div>
          </div>

          {/* Language selector */}
          <LanguageSelector />

          {/* Logout button */}
          <button className="btn btn-danger fw-semibold" onClick={logout}>
            {t("logout")}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

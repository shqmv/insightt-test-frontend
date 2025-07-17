/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import {
  ITask,
  ITaskCreateRequest,
  ITaskDeleteResponse,
} from "@/interfaces/ITask";
import {
  API_TASK,
  API_TASK_CREATE,
  API_TASK_DELETE,
  API_TASK_UPDATE,
  API_TASK_UPDATE_STATUS,
} from "@/utils/Const";
import { useRequestWithLoading } from "@/hooks/useRequestWithLoading";
import { toast } from "react-toastify";
import { ToastConfig } from "@/config/Toast";
import { t } from "i18next";

/**
 * Custom React hook to manage task-related state and actions for the home page.
 *
 * @function
 * @name useHome
 * @returns {{
 *   tasks: ITask[],
 *   formData: ITaskCreateRequest,
 *   showForm: boolean,
 *   editingTask: ITask | null,
 *   logout: () => void,
 *   setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
 *   setFormData: React.Dispatch<React.SetStateAction<ITaskCreateRequest>>,
 *   handleSubmit: (e: React.FormEvent) => Promise<void>,
 *   handleEdit: (task: ITask) => void,
 *   handleDelete: (id: string) => Promise<void>,
 *   handleStatusEdit: (task: ITask) => Promise<void>,
 *   cancelForm: () => void
 * }}
 *
 * @description
 * Provides state and logic for displaying, creating, editing, updating status, and deleting tasks.
 * Also manages form interactions and handles authenticated user logout.
 */
export function useHome() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [formData, setFormData] = useState<ITaskCreateRequest>({ title: "" });
  const { logout } = useAuth();
  const { sendRequest } = useRequestWithLoading();

  useEffect(() => {
    loadTaskData().then(setTasks);
  }, []);

  const loadTaskData = async () => {
    const response = await sendRequest<ITask[]>({ url: API_TASK, options: { method: "GET" }, errorMessage: t("request_error") });
    return response;
  };

  const requestTaskAdd = async () => {
    const response = await sendRequest<ITask>({
      url: API_TASK_CREATE, 
      options: {
        method: "POST",
        body: JSON.stringify({ title: formData.title }),
      }, 
      errorMessage: t("request_error")
    });
    toast.info(t("home.toast_task_created"), ToastConfig);
    setTasks([...tasks, response]);
  };

  const requestTaskEdit = async () => {
    if (!editingTask) return;
    const response = await sendRequest<ITask>({
      url: API_TASK_UPDATE.replace(":id", editingTask._id), 
      options: {
        method: "PATCH",
        body: JSON.stringify({ title: formData.title }),
      }, 
      errorMessage: t("request_error")
    });
    toast.info(t("home.toast_task_modified"), ToastConfig);
    setTasks(tasks.map(t => (t._id === editingTask._id ? response : t)));
  };

  const requestTaskStatusEdit = async (id: string, done: boolean) => {
    const response = await sendRequest<ITask>({
      url: API_TASK_UPDATE_STATUS.replace(":id", id), 
      options: {
        method: "PATCH",
        body: JSON.stringify({ done }),
      }, 
      errorMessage: t("request_error")
    });
    toast.info(t("home.toast_task_modified"), ToastConfig);
    setTasks(tasks.map(t => (t._id === id ? { ...response, done } : t)));
  };

  const requestTaskDelete = async (id: string) => {
    await sendRequest<ITaskDeleteResponse>({
      url: API_TASK_DELETE.replace(":id", id), 
      options: {
        method: "DELETE",
      }, 
      errorMessage: t("request_error")
    });
    toast.info(t("home.toast_task_deleted"), ToastConfig);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) await requestTaskEdit();
    else await requestTaskAdd();
    cancelForm();
  };

  const handleEdit = (task: ITask) => {
    setEditingTask(task);
    setFormData({ title: task.title });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t("home.question_task_delete"))) {
      await requestTaskDelete(id);
    }
  };

  const handleStatusEdit = async (task: ITask) => {
    await requestTaskStatusEdit(task._id, !task.done);
  };

  const cancelForm = () => {
    setFormData({ title: "" });
    setShowForm(false);
    setEditingTask(null);
  };

  return {
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
  };

}

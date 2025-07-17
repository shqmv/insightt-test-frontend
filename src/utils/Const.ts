export const API_BASE_URL = `http://localhost:4000/api`;

export const API_USER = `${API_BASE_URL}/users`;
export const API_USER_CREATE = `${API_BASE_URL}/users/register`;
export const API_USER_RECOVER = `${API_BASE_URL}/users/recover`;
export const API_USER_LOGIN = `${API_BASE_URL}/users/login`;
export const API_USER_LOGOUT = `${API_BASE_URL}/users/logout`;

export const API_TASK = `${API_BASE_URL}/tasks`;
export const API_TASK_CREATE = `${API_TASK}/`;
export const API_TASK_UPDATE = `${API_TASK}/:id`;
export const API_TASK_UPDATE_STATUS = `${API_TASK}/done/:id`;
export const API_TASK_DELETE = `${API_TASK}/:id`;

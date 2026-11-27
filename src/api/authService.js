import { apiFetch } from "./apiClient.js";

export const authService = {
    login: (credentials) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
    register: (userData) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(userData) }),
};

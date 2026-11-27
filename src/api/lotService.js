import { apiFetch } from "./apiClient.js";

export const lotService = {
    getAll: () => apiFetch("/lots"),
    getById: (id) => apiFetch(`/lots/${id}`),
    getDashboard: (id) => apiFetch(`/lots/${id}/dashboard`),
    create: (lotData) => apiFetch("lots", { method: "POST", body: JSON.stringify(lotData) }),
    delete: (id) => apiFetch(`/lots/${id}`, { method: "DELETE" }),
};

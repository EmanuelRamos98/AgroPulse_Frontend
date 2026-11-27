import { apiFetch } from "./apiClient.js";

export const rainService = {
    getSummary: (lotId) => apiFetch(`/lots/${lotId}/rain-records`),
    addManual: (lotId, rainData) => apiFetch(`/lots/${lotId}/rain-records`, { method: "POST", body: JSON.stringify(rainData) }),
    deleteRecord: (lotId, recordId) => apiFetch(`/lots/${lotId}/rain-records/${recordId}`, { method: "DELETE" }),
};

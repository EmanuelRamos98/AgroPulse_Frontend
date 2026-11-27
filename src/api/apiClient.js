const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem("agropulse_token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    //Si vencio/invalido el token
    if (response.status === 401 && !endpoint.includes("/auth/login")) {
        localStorage.removeItem("agropulse_token");
        localStorage.removeItem("agropulse_user");
        window.location.href = "/login";
        throw new Error("Sesión expirada. Iniciá sesión nuevamente.");
    }

    //Sin content
    if (response.status === 204) return null;

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const errorMsg = data?.detail || data?.message || data?.title || "Error en la solicitud";
        throw new Error(errorMsg);
    }

    return data;
};

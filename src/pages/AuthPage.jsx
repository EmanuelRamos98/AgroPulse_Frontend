import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { authService } from "../api/authService";

const AuthPage = () => {
    const { isAuthenticated, loginSuccess } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    if (isAuthenticated) return <Navigate to="/lots" replace />;

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        setErrorMsg("");
        setFormData((prev) => ({
            ...prev,
            password: "",
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errorMsg) setErrorMsg("");
    };

    // Errores del servidor
    const extractApiError = (err) => {
        if (!err) return "Ocurrió un error inesperado al conectar con el servidor.";
        if (typeof err === "string") return err;
        if (err.errors && typeof err.errors === "object") {
            const firstKey = Object.keys(err.errors)[0];
            if (firstKey && Array.isArray(err.errors[firstKey])) {
                return err.errors[firstKey][0];
            }
        }
        return err.detail || err.message || err.title || "Credenciales o datos inválidos.";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const email = formData.email.trim();
        const password = formData.password;

        if (!email || !password) {
            setErrorMsg("Por favor completá tu correo electrónico y contraseña.");
            return;
        }

        if (mode === "register") {
            if (formData.fullName.trim().length < 3) {
                setErrorMsg("Ingresá tu nombre completo o razón social (mínimo 3 caracteres).");
                return;
            }
            if (password.length < 6) {
                setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
                return;
            }
        }

        setLoading(true);
        try {
            const authResponse =
                mode === "login"
                    ? await authService.login({ email, password })
                    : await authService.register({
                        fullName: formData.fullName.trim(),
                        email,
                        password,
                    });

            loginSuccess(authResponse);
            navigate("/lots", { replace: true });
        } catch (err) {
            setErrorMsg(extractApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-wrapper">
            <section className="auth-card" aria-labelledby="auth-heading">
                <div className="auth-header">
                    <div className="auth-logo-lg" aria-hidden="true">
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                        </svg>
                    </div>
                    <h1 id="auth-heading" style={{ fontSize: "1.55rem", fontWeight: 800, margin: 0 }}>
                        AgroPulse
                    </h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginTop: "0.25rem" }}>
                        Monitoreo agrometeorológico y decisiones a campo
                    </p>
                </div>

                {/* Pestañas Login / Registro */}
                <div className="auth-tabs" role="tablist">
                    <button
                        type="button"
                        className={`auth-tab ${mode === "login" ? "active" : ""}`}
                        role="tab"
                        aria-selected={mode === "login"}
                        onClick={() => handleModeSwitch("login")}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        type="button"
                        className={`auth-tab ${mode === "register" ? "active" : ""}`}
                        role="tab"
                        aria-selected={mode === "register"}
                        onClick={() => handleModeSwitch("register")}
                    >
                        Crear Cuenta
                    </button>
                </div>

                {errorMsg && (
                    <div className="auth-error-box" role="alert">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            style={{ flexShrink: 0, marginTop: "2px" }}
                            aria-hidden="true"
                        >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    {mode === "register" && (
                        <div className="ap-form-group">
                            <label className="ap-form-label" htmlFor="auth-fullname">
                                Nombre completo / Establecimiento
                            </label>
                            <input
                                className="ap-form-control"
                                type="text"
                                id="auth-fullname"
                                name="fullName"
                                placeholder="Ej. Ing. Martín Etcheverry"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                    )}

                    <div className="ap-form-group">
                        <label className="ap-form-label" htmlFor="auth-email">
                            Correo electrónico
                        </label>
                        <input
                            className="ap-form-control"
                            type="email"
                            id="auth-email"
                            name="email"
                            placeholder="productor@campo.com.ar"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="ap-form-group">
                        <label className="ap-form-label" htmlFor="auth-password">
                            Contraseña
                        </label>
                        <input
                            className="ap-form-control"
                            type="password"
                            id="auth-password"
                            name="password"
                            placeholder={mode === "register" ? "Mínimo 6 caracteres" : "••••••••"}
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            autoComplete={mode === "login" ? "current-password" : "new-password"}
                        />
                    </div>

                    <button
                        type="submit"
                        className="ap-btn ap-btn-primary ap-btn-lg ap-btn-block"
                        disabled={loading}
                    >
                        {loading
                            ? mode === "login"
                                ? "Ingresando..."
                                : "Creando cuenta..."
                            : mode === "login"
                                ? "Ingresar a Mis Lotes"
                                : "Crear Cuenta y Entrar"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default AuthPage;
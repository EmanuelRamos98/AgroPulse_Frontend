import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import useTheme from "../hooks/useTheme"


const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()

    if (!isAuthenticated) return null;

    const producerName = user?.fullname || user?.email?.split('@')[0] || 'Productor'

    const handleLogout = () => {
        logout()
        navigate('/auth', { replace: true })
    }

    return (
        <header className="app-header">
            <div className="ap-container header-inner">
                <Link to="/lots" className="brand-logo" aria-label="Ir a Mis Lotes">
                    <div className="brand-icon" aria-hidden="true">
                        <svg
                            width="22"
                            height="22"
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
                    <span className="brand-name">AgroPulse</span>
                    <span className="brand-tag">La Pampa</span>
                </Link>

                <div className="header-actions">
                    <div className="producer-pill" title={user?.email || ''}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            aria-hidden="true"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>{producerName}</span>
                    </div>

                    <button
                        type="button"
                        className="ap-btn ap-btn-secondary"
                        onClick={toggleTheme}
                        aria-label="Alternar modo claro u oscuro"
                    >
                        <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
                        <span>{theme === 'light' ? 'Oscuro' : 'Claro'}</span>
                    </button>

                    <button
                        type="button"
                        className="ap-btn ap-btn-ghost"
                        onClick={handleLogout}
                        title="Cerrar Sesión"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.3"
                            aria-hidden="true"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Salir</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('agropulse_user')
        return saved ? JSON.parse(saved) : null
    })

    const loginSuccess = (authResponse) => {
        localStorage.setItem('agropulse_token', authResponse.token)
        const userData = {
            userId: authResponse.userId,
            fullName: authResponse.fullName,
            email: authResponse.email
        }
        localStorage.setItem('agropluse_user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('agropulse_token')
        localStorage.removeItem('agropulse_user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginSuccess, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
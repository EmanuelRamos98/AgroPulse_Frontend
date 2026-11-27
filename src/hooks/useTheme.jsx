import { useEffect, useState } from "react"

const useTheme = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('agropulse_theme') || 'ligth')

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme)
        localStorage.setItem('agropulse_theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme((prev) => (prev === 'ligth' ? 'dark' : 'ligth'))

    return { theme, toggleTheme }
}

export default useTheme
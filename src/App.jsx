import AuthPage from './pages/AuthPage';
import LotsPage from './pages/LotsPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
    const { isAuthenticated } = useAuth()

    return (
        <div className="min-vh-100 d-flex flex-column">
            {isAuthenticated && <Navbar />}
            <div className="flex-grow-1 d-flex flex-column">
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/lots" replace /> : <AuthPage />} />
                    <Route path="/lots" element={<ProtectedRoute><LotsPage /></ProtectedRoute>} />
                    <Route path="/lots/:id" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to={isAuthenticated ? '/lots' : '/login'} replace />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
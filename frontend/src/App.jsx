// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Navbar from './components/Common/Navbar';
import LoadingSpinner from './components/Common/LoadingSpinner';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Higher-Order Component for routes that require authentication
const ProtectedRoute = () => {
    const { isAuthenticated, isLoadingAuth } = useAuth();

    if (isLoadingAuth) {
        return (
            <div className="loading-spinner-container" style={{ minHeight: 'calc(100vh - 60px)' }}> {/* Adjust height */}
                <LoadingSpinner message="Verifying authentication..." size="large" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: window.location }} replace />;
    }
    return <Outlet />; // Renders the nested child route component
};

// Layout for routes that include the Navbar
const MainLayout = () => (
    <>
        <Navbar />
        <main> {/* main tag defined in index.css */}
            <Outlet />
        </main>
        {/* <Footer /> You could add a footer here */}
    </>
);

function AppRoutes() {
    const { isAuthenticated, isLoadingAuth } = useAuth();

    // This helps prevent flashing content before auth state is known
    // It shows a global loading spinner if initial auth check is in progress.
    if (isLoadingAuth && !isAuthenticated && window.location.pathname !== '/login' && window.location.pathname !== '/') {
        // Avoid showing global spinner on public pages or login page during initial load.
        // This logic can be fine-tuned based on which routes should show global loading.
        // For instance, if token is present, we might assume auth and show spinner until verified.
    }


    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/register" element={<RegisterPage />} /> You'd add this */}

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    {/* Add other protected routes here, e.g., /profile, /settings */}
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
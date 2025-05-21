// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css'; // Create this CSS file

function LoginPage() {
    const { isAuthenticated, isLoadingAuth } = useAuth();

    if (isLoadingAuth) {
        return <div className="text-center mt-3"><p>Loading authentication...</p></div>; // Or a spinner
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="login-page-container">
            <div className="login-form-wrapper">
                <LoginForm />
                {/* <div className="text-center mt-2">
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div> */}
            </div>
        </div>
    );
}

export default LoginPage;
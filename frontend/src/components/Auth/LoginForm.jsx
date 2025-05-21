// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorMessage from '../Common/ErrorMessage'; // Import ErrorMessage

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, authActionLoading, authError, setAuthError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setAuthError) setAuthError(null); // Clear previous errors

        const success = await login({ username, password }); // Pass as object
        if (success) {
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>Login</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {authError && <ErrorMessage message="Login Failed" details={authError} />}
                    <div className="form-group">
                        <label className="form-label" htmlFor="login-username">Username:</label>
                        <input
                            type="text"
                            id="login-username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="login-password">Password:</label>
                        <input
                            type="password"
                            id="login-password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2" disabled={authActionLoading}>
                        {authActionLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
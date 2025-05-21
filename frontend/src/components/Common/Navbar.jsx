// src/components/Common/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css'; // Create this CSS file for Navbar styling

function Navbar() {
    const { isAuthenticated, logout, user, authActionLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // AuthContext's logout or the event listener should handle navigation
    };

    return (
        <header className="navbar-header">
            <nav className="navbar-container">
                <Link to="/" className="navbar-brand">RemindMeLater</Link>
                <ul className="navbar-links">
                    {isAuthenticated ? (
                        <>
                            {/* {user && <li className="navbar-user">Welcome, {user.username || 'User'}!</li>} */}
                            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                            <li>
                                <button onClick={handleLogout} className="nav-button btn btn-danger" disabled={authActionLoading}>
                                    {authActionLoading ? 'Logging out...' : 'Logout'}
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/login" className="nav-link btn btn-primary">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
export default Navbar;
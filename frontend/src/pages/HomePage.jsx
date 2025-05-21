// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css'; // Create this CSS file

function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome to RemindMeLater!</h1>
                <p className="homepage-subtitle">Never forget an important task again.</p>
            </header>
            <section className="homepage-cta">
                {isAuthenticated ? (
                    <>
                        <p>You are logged in. Go to your dashboard to manage reminders.</p>
                        <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard</Link>
                    </>
                ) : (
                    <>
                        <p>Get started by logging in or creating an account.</p>
                        <Link to="/login" className="btn btn-primary btn-lg">Login / Sign Up</Link>
                    </>
                )}
            </section>
            <section className="homepage-features">
                <h2>Features</h2>
                <ul>
                    <li>Easy reminder creation</li>
                    <li>SMS and Email notifications (conceptual)</li>
                    <li>Organize your life</li>
                </ul>
            </section>
        </div>
    );
}
export default HomePage;
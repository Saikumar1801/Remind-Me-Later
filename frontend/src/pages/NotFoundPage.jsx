// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist or you may not have access to it.</p>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
    );
}
export default NotFoundPage;
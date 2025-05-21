// src/components/Common/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css'; // Create this CSS file

function LoadingSpinner({ size = 'medium', message }) {
    return (
        <div className={`loading-spinner-container ${size}`}>
            <div className="spinner"></div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
}
export default LoadingSpinner;
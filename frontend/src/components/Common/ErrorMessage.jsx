// src/components/Common/ErrorMessage.jsx
import React from 'react';

function ErrorMessage({ message, details }) {
    if (!message && !details) return null;

    return (
        <div className="error-message-box" role="alert">
            {message && <p><strong>{message}</strong></p>}
            {details && (
                typeof details === 'string' ? <p>{details}</p> :
                <ul>
                    {Object.entries(details).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default ErrorMessage;
// src/components/Reminders/ReminderItem.jsx
import React from 'react';
import './ReminderItem.css'; // Create this CSS file

function ReminderItem({ reminder, onDelete, onEdit, onMarkAsSent, isProcessing }) {
    const { id, message, reminder_datetime, delivery_method, owner_username, is_sent } = reminder;

    return (
        <li className={`reminder-item-card ${is_sent ? 'sent' : 'pending'}`}>
            <div className="reminder-content">
                <h4>{message}</h4>
                <p className="reminder-meta">
                    Scheduled for: <strong>{new Date(reminder_datetime).toLocaleString()}</strong>
                </p>
                <p className="reminder-meta">
                    Method: {delivery_method} | Owner: {owner_username}
                </p>
                <p className={`reminder-status ${is_sent ? 'status-sent' : 'status-pending'}`}>
                    Status: {is_sent ? 'Sent' : 'Pending'}
                </p>
            </div>
            <div className="reminder-actions">
                {!is_sent && onEdit && (
                    <button onClick={() => onEdit(reminder)} className="btn btn-secondary btn-sm" disabled={isProcessing}>
                        Edit
                    </button>
                )}
                {!is_sent && onMarkAsSent && (
                     <button onClick={() => onMarkAsSent(id)} className="btn btn-secondary btn-sm" disabled={isProcessing}>
                        Mark Sent
                    </button>
                )}
                {onDelete && (
                    <button onClick={() => onDelete(id)} className="btn btn-danger btn-sm" disabled={isProcessing}>
                        {isProcessing ? 'Deleting...' : 'Delete'}
                    </button>
                )}
            </div>
        </li>
    );
}
export default ReminderItem;
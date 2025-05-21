// src/components/Reminders/ReminderList.jsx
import React from 'react';
import ReminderItem from './ReminderItem';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import './ReminderList.css'; // Create this CSS file

function ReminderList({
    reminders,
    isLoading,
    error,
    onDelete,
    onEdit,
    onMarkAsSent,
    processingItemId // ID of item being deleted/updated for individual loading state
}) {
    if (isLoading && reminders.length === 0) {
        return <LoadingSpinner message="Fetching your reminders..." />;
    }

    if (error && reminders.length === 0) {
        return <ErrorMessage message="Could not load reminders" details={error} />;
    }

    if (!isLoading && reminders.length === 0) {
        return <div className="empty-list-message">You have no reminders yet. Add one!</div>;
    }

    return (
        <ul className="reminders-list-container">
            {reminders.map(reminder => (
                <ReminderItem
                    key={reminder.id}
                    reminder={reminder}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onMarkAsSent={onMarkAsSent}
                    isProcessing={processingItemId === reminder.id}
                />
            ))}
        </ul>
    );
}
export default ReminderList;
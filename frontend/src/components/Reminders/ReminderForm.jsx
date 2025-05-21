// src/components/Reminders/ReminderForm.jsx
import React, { useState, useEffect } from 'react';
import ErrorMessage from '../Common/ErrorMessage';

function ReminderForm({ onSubmit, initialData, isLoading, apiError, onCancel }) {
    const [message, setMessage] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('EMAIL');
    const [formError, setFormError] = useState(null); // Local form validation error

    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            setMessage(initialData.message || '');
            if (initialData.reminder_datetime) {
                const dt = new Date(initialData.reminder_datetime);
                setReminderDate(dt.toISOString().split('T')[0]);
                setReminderTime(dt.toTimeString().split(' ')[0].substring(0, 5));
            }
            setDeliveryMethod(initialData.delivery_method || 'EMAIL');
        }
    }, [initialData]);

    const validateForm = () => {
        if (!message.trim()) {
            setFormError("Message cannot be empty.");
            return false;
        }
        if (!reminderDate) {
            setFormError("Date is required.");
            return false;
        }
        if (!reminderTime) {
            setFormError("Time is required.");
            return false;
        }
        setFormError(null);
        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const success = await onSubmit({
            message,
            reminder_date: reminderDate,
            reminder_time: reminderTime,
            delivery_method: deliveryMethod,
        });

        if (success && !isEditing) { // Clear form only on successful create
            setMessage('');
            setReminderDate('');
            setReminderTime('');
            setDeliveryMethod('EMAIL');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3>{isEditing ? 'Edit Reminder' : 'Create New Reminder'}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {apiError && <ErrorMessage message="API Error" details={apiError} />}
                    {formError && <ErrorMessage message="Validation Error" details={formError} />}
                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="3"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="reminder_date">Date:</label>
                        <input
                            type="date"
                            id="reminder_date"
                            className="form-control"
                            value={reminderDate}
                            onChange={(e) => setReminderDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="reminder_time">Time:</label>
                        <input
                            type="time"
                            id="reminder_time"
                            className="form-control"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="delivery_method">Delivery Method:</label>
                        <select
                            id="delivery_method"
                            className="form-control"
                            value={deliveryMethod}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                        >
                            <option value="EMAIL">Email</option>
                            <option value="SMS">SMS</option>
                        </select>
                    </div>
                    <div className="form-actions mt-2">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Changes' : 'Add Reminder')}
                        </button>
                        {isEditing && onCancel && (
                            <button type="button" className="btn btn-secondary" onClick={onCancel} style={{marginLeft: '10px'}} disabled={isLoading}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReminderForm;
// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
    fetchReminders,
    addReminder,
    removeReminder,
    editReminder as apiEditReminder, // Renamed to avoid conflict
    markReminderAsSentService
} from '../api/reminderService';
import ReminderForm from '../components/Reminders/ReminderForm';
import ReminderList from '../components/Reminders/ReminderList';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import './DashboardPage.css'; // Create this CSS file

function DashboardPage() {
    const [reminders, setReminders] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [listError, setListError] = useState(null);

    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [formApiError, setFormApiError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [totalReminders, setTotalReminders] = useState(0);

    const [editingReminder, setEditingReminder] = useState(null); // For edit mode
    const [processingItemId, setProcessingItemId] = useState(null); // For delete/mark as sent

    // Filters and Search (example placeholders, you'd add UI for these)
    // const [searchTerm, setSearchTerm] = useState('');
    // const [filterDelivery, setFilterDelivery] = useState('');

    const loadReminders = useCallback(async (page = 1, append = false) => {
        setIsLoadingList(true);
        setListError(null);
        try {
            const params = { page };
            // if (searchTerm) params.search = searchTerm;
            // if (filterDelivery) params.delivery_method = filterDelivery;
            const data = await fetchReminders(params);
            setReminders(prev => append ? [...prev, ...data.results] : data.results);
            setHasNextPage(!!data.next);
            setCurrentPage(page);
            setTotalReminders(data.count);
        } catch (err) {
            const errorDetail = err.response?.data || { message: err.message || 'Failed to fetch reminders.' };
            setListError(errorDetail);
        } finally {
            setIsLoadingList(false);
        }
    }, []); // Add searchTerm, filterDelivery to deps if using them

    useEffect(() => {
        loadReminders(1); // Initial load
    }, [loadReminders]);

    const handleFormSubmit = async (reminderData) => {
        setIsSubmittingForm(true);
        setFormApiError(null);
        try {
            if (editingReminder) {
                await apiEditReminder(editingReminder.id, reminderData);
            } else {
                await addReminder(reminderData);
            }
            setEditingReminder(null); // Exit edit mode
            loadReminders(1); // Refresh list from page 1
            return true; // Indicate success
        } catch (err) {
            const errorDetail = err.response?.data || { message: err.message || (editingReminder ? 'Failed to update reminder.' : 'Failed to create reminder.') };
            setFormApiError(errorDetail);
            return false; // Indicate failure
        } finally {
            setIsSubmittingForm(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this reminder?")) return;
        setProcessingItemId(id);
        setListError(null);
        try {
            await removeReminder(id);
            // Optimistic update or refetch:
            setReminders(prev => prev.filter(r => r.id !== id));
            setTotalReminders(prev => prev -1);
        } catch (err) {
            const errorDetail = err.response?.data || { message: err.message || "Failed to delete reminder." };
            setListError(errorDetail);
        } finally {
            setProcessingItemId(null);
        }
    };

    const handleEdit = (reminder) => {
        setEditingReminder(reminder);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form for editing
    };

    const handleCancelEdit = () => {
        setEditingReminder(null);
        setFormApiError(null); // Clear any errors from edit attempt
    };

    const handleMarkAsSent = async (id) => {
        setProcessingItemId(id);
        setListError(null);
        try {
            const updatedReminder = await markReminderAsSentService(id);
            setReminders(prev => prev.map(r => r.id === id ? updatedReminder : r));
        } catch (err) {
            const errorDetail = err.response?.data || { message: err.message || "Failed to mark as sent." };
            setListError(errorDetail);
        } finally {
            setProcessingItemId(null);
        }
    };


    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Reminders</h1>
                {/* Add filter/search controls here */}
            </header>

            <ReminderForm
                onSubmit={handleFormSubmit}
                initialData={editingReminder}
                isLoading={isSubmittingForm}
                apiError={formApiError}
                onCancel={editingReminder ? handleCancelEdit : undefined}
            />

            <section className="reminders-section">
                <h3>Current Reminders ({totalReminders})</h3>
                {listError && <ErrorMessage message="Error with reminders list" details={listError} />}
                <ReminderList
                    reminders={reminders}
                    isLoading={isLoadingList && reminders.length === 0} // Show main loading only if list is empty
                    error={null} // Error is handled above the list
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onMarkAsSent={handleMarkAsSent}
                    processingItemId={processingItemId}
                />
                {isLoadingList && reminders.length > 0 && <LoadingSpinner message="Loading more..." size="small" />}
                {hasNextPage && !isLoadingList && (
                    <div className="pagination-controls text-center mt-2">
                        <button onClick={() => loadReminders(currentPage + 1, true)} className="btn btn-secondary">
                            Load More
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
export default DashboardPage;
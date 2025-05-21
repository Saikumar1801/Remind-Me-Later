// src/api/reminderService.js
import apiClient from './apiClient';

const REMINDERS_ENDPOINT = '/reminders/';

export const fetchReminders = async (params = {}) => {
    // params can include: page, search, ordering, filterset_fields like delivery_method
    const response = await apiClient.get(REMINDERS_ENDPOINT, { params });
    return response.data; // Expects DRF paginated response: { count, next, previous, results }
};

export const fetchReminderById = async (id) => {
    const response = await apiClient.get(`${REMINDERS_ENDPOINT}${id}/`);
    return response.data;
};

export const addReminder = async (reminderData) => {
    // reminderData: { message, reminder_date, reminder_time, delivery_method }
    const response = await apiClient.post(REMINDERS_ENDPOINT, reminderData);
    return response.data;
};

export const editReminder = async (id, reminderData) => {
    const response = await apiClient.put(`${REMINDERS_ENDPOINT}${id}/`, reminderData); // or PATCH
    return response.data;
};

export const removeReminder = async (id) => {
    await apiClient.delete(`${REMINDERS_ENDPOINT}${id}/`);
    // DELETE typically returns 204 No Content
};

export const markReminderAsSentService = async (id) => {
    const response = await apiClient.post(`${REMINDERS_ENDPOINT}${id}/mark_as_sent/`);
    return response.data;
};

export const fetchUpcomingReminders = async () => {
    const response = await apiClient.get(`${REMINDERS_ENDPOINT}upcoming/`);
    return response.data;
};
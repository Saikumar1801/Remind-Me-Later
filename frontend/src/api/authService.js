// src/api/authService.js
import apiClient from './apiClient';

export const loginUser = async (credentials) => {
    // credentials: { username, password }
    const response = await apiClient.post('/api-token-auth/', credentials);
    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        // Optionally fetch and store user details if API returns them or via another endpoint
    }
    return response.data; // { token: "..." }
};

export const logoutUser = () => {
    localStorage.removeItem('authToken');
    // No backend call generally needed for simple token auth to "logout" on client.
    // If you have server-side session invalidation for tokens, call that here.
};

export const checkIsAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    // You might add token expiration check here if tokens are JWTs with expiry
    return !!token;
};

// Example if you had a /users/me/ endpoint to get current user details
// export const getCurrentUserDetails = async () => {
//     const response = await apiClient.get('/users/me/'); // Assuming this endpoint exists
//     return response.data;
// };
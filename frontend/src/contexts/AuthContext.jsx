// src/contexts/AuthContext.jsx
import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext, // ✅ ADDED HERE
} from 'react';
import { loginUser as apiLogin, logoutUser as apiLogout, checkIsAuthenticated } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
    const [user, setUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [authActionLoading, setAuthActionLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();

    const handleGlobalLogout = useCallback(() => {
        apiLogout();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login', { replace: true });
    }, [navigate]);

    useEffect(() => {
        const handleAuthExpired = () => {
            console.warn("Authentication expired or invalid. Logging out.");
            handleGlobalLogout();
        };
        window.addEventListener('auth-expired', handleAuthExpired);
        return () => window.removeEventListener('auth-expired', handleAuthExpired);
    }, [handleGlobalLogout]);

    useEffect(() => {
        const verifyAuth = async () => {
            setIsLoadingAuth(true);
            const authenticated = checkIsAuthenticated();
            setIsAuthenticated(authenticated);
            // Optional: Fetch user details here if needed
            setIsLoadingAuth(false);
        };
        verifyAuth();
    }, [user, handleGlobalLogout]);

    const login = async (credentials) => {
        setAuthActionLoading(true);
        setAuthError(null);
        try {
            await apiLogin(credentials);
            setIsAuthenticated(true);
            // Optionally fetch and set user details here
            setAuthActionLoading(false);
            return true;
        } catch (error) {
            const errorMsg =
                error.response?.data?.non_field_errors?.[0] ||
                (error.response?.data ? JSON.stringify(error.response.data) : error.message) ||
                'Login failed.';
            setAuthError(errorMsg);
            setAuthActionLoading(false);
            return false;
        }
    };

    const logout = () => {
        setAuthActionLoading(true);
        handleGlobalLogout();
        setAuthActionLoading(false);
    };

    const contextValue = {
        isAuthenticated,
        user,
        isLoadingAuth,
        authActionLoading,
        authError,
        login,
        logout,
        setAuthError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

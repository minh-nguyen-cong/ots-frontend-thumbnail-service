import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state for initial check
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        // When the app loads, if a token exists, validate it by fetching the user profile.
        if (token) {
            authApi.getProfile()
                .then(response => {
                    // Assuming the profile endpoint returns the user object, e.g., { email: '...' }
                    setUser(response.data);
                })
                .catch(error => {
                    // If the token is invalid or expired, the API call will fail.
                    console.error("Session validation failed:", error);
                    logout(); // Clear the invalid token.
                })
                .finally(() => {
                    setLoading(false); // Stop loading once the check is complete
                });
        } else {
            setUser(null);
            setLoading(false); // Stop loading if there's no token
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await authApi.login(email, password);
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return <AuthContext.Provider value={{ user, token, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

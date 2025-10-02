import axios from 'axios';

// This function adds the JWT to requests for authenticated endpoints.
const addAuthInterceptor = (client) => {
    client.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};

// Client for the Authentication Service (has both public and protected endpoints)
export const authApiClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_BASE_URL,
});

// Client for the Image Service (protected endpoints)
export const imageApiClient = axios.create({
    baseURL: import.meta.env.VITE_IMAGE_API_BASE_URL,
});

// Add the interceptor to the client that needs authentication
addAuthInterceptor(authApiClient);
addAuthInterceptor(imageApiClient);
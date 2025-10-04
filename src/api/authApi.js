import apiClient from './apiClient';

export const authApi = {
    login: (email, password) => {
        return apiClient.post('/api/auth/login', { email, password });
    },
    register: (email, password) => {
        return apiClient.post('/api/auth/register', { email, password });
    },
    getProfile: () => {
        return apiClient.get('/api/auth/profile');
    }
};

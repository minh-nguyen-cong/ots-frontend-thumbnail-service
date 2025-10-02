import { authApiClient } from './apiClient';

export const authApi = {
    login: (email, password) => {
        return authApiClient.post('/api/auth/login', { email, password });
    },
    register: (email, password) => {
        return authApiClient.post('/api/auth/register', { email, password });
    },
    getProfile: () => {
        return authApiClient.get('/api/auth/profile');
    }
};

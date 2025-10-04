import axios from 'axios';

// Create a single API client that points to the API Gateway
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a single interceptor to attach the JWT to all outgoing requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
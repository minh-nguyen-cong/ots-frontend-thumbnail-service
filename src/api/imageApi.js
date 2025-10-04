import apiClient from './apiClient';

export const imageApi = {
    getImages: () => {
        return apiClient.get('/api/images');
    },
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post('/api/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    deleteImageById: (id) => {
        return apiClient.delete(`/api/images/${id}`);
    },
    deleteAllImages: () => {
        return apiClient.delete('/api/images');
    }
};
import { imageApiClient } from './apiClient';

export const imageApi = {
    getImages: () => {
        return imageApiClient.get('/api/images');
    },
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return imageApiClient.post('/api/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};
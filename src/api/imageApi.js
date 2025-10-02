import { imageApiClient } from './apiClient';

export const imageApi = {
    getImages: () => {
        return imageApiClient.get('/api/images');
    }
};
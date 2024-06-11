import apiClient from './axiosConfig';

// Получение историй
export const apiGetStories = async () => {
    const response = await apiClient.get(`/stories?nPageSize=999&page=1`);
    return response.data;
};
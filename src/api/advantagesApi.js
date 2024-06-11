import apiClient from './axiosConfig';

// Получение преимуществ
export const apiGetAdvantages = async () => {
    const response = await apiClient.get(`/advantages?nPageSize=9999&page=1`);
    return response.data;
};

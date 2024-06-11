import apiClient from './axiosConfig';

// Получение отзывов
export const apiGetReviews = async ({nPageSize, page}) => {
  const response = await apiClient.get(`/reviews?nPageSize=${nPageSize}&page=${page}`);
  return response.data;
};

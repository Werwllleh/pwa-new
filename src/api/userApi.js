import apiClient from './axiosConfig';

// Инициация проверки телефона
export const apiRequestCode = async (phone) => {
  const response = await apiClient.post('/auth/request-code', { phone });
  return response.data;
};

// Проверка кода
export const apiVerifyCode = async (phone, code) => {
  const response = await apiClient.post('/auth/verify-code', { phone, code });
  return response.data;
};

// Получение информации пользователя
export const apiGetUserProfile = async () => {
  const response = await apiClient.get('/user/profile');
  return response.data;
};

// Обновление информации пользователя
export const apiSetUserProfile = async (data) => {
  const response = await apiClient.post('/user/profile', data);
  return response.data;
};
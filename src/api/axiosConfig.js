import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['X-Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Интерцепторы для обработки ошибок
/*apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = localStorage.getItem('refresh_token');
      try {
        const response = await refreshToken();
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${response.access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        //useUserStore.getState().logout();
        console.log('logout')
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);*/

apiClient.interceptors.response.use(response => response, error => {
  const { response, config } = error

  if(!response || !response.status) {
    console.log('response error')
    return
  }

  if (response?.status !== 401) {
    return Promise.reject(error)
  }

  return axios.get('/refresh-token')
    .then((res) => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      return apiClient(config)
    })
    .catch(() => {
      return Promise.reject(error)
    })
})

export default apiClient;
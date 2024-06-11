import create from 'zustand';
import {
  apiRequestCode,
  apiVerifyCode,
  apiSetUserProfile, apiLogout
} from '../api/userApi';

export const useUserStore = create((set, get) => ({
  phone: '',
  pin: localStorage.getItem('pin') || '',
  firstName: '',
  secondName: '',
  lastName: '',
  birthDate: '',
  email: '',
  city: '',
  accessToken: localStorage.getItem('access_token') || '',
  refreshToken: localStorage.getItem('refresh_token') || '',
  // isAuthenticated: !!localStorage.getItem('access_token'),
  isAuthenticated: true,

  // Методы для обновления состояния
  setPhone: (phone) => set({ phone }),
  //setPersonalInfo: (data) => set({ ...data }),
  setPin: (pin) => set({ pin }),
  confirmPin: (pin) => localStorage.setItem('pin', pin),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated  }),

  // Методы для выполнения запросов и обновления состояния
  sendPhoneNumber: async () => {
    const phone = get().phone;
    try {
      const response = await apiRequestCode(phone);
      return response;
    } catch (error) {
      throw error;
    }
  },

  verifyPhoneNumber: async (phone, verificationCode) => {
    try {
      const response = await apiVerifyCode(phone, verificationCode);
      //set({ accessToken: response.access_token, refreshToken: response.refresh_token, isAuthenticated: true });
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      return true;
    } catch (error) {
      return false
    }
  },

  submitPersonalInfo: async ({ firstName, secondName, lastName, birthDate, email, city  }) => {
    try {
      const response = await apiSetUserProfile({ firstName, secondName, lastName, birthDate, email, city });
      await set({ firstName, secondName, lastName, birthDate, email, city  });
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    set({ accessToken: '', refreshToken: '', isAuthenticated: false });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
}));
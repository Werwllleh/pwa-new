import { create } from 'zustand';
import apiClient from "../api/axiosConfig";

export const useQaStore = create((set) => ({
  qa: [],
  updateQa: async () => {
    const response = await apiClient.get(`${process.env.REACT_APP_REST_SERVER_URL}/qa`)
    const result = await response.data
    set({qa: result})
  },
}))
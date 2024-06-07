import { create } from 'zustand';
import axios from "axios";

export const useQaStore = create((set) => ({
  qa: [],
  updateQa: async () => {
    const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/qa`)
    const result = await response.data
    set({qa: result})
  },
}))
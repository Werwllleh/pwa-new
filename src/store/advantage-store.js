import { create } from 'zustand';
import axios from "axios";

export const useAdvantageStore = create((set) => ({
  advantages: [],
  advantagesAuth: [],
  updateAdvantages: async () => {
    const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/advantages`)
    set({advantages: await response.data})
  },
  updateAdvantagesAuth: async () => {
    const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/advantages-auth`)
    set({advantagesAuth: await response.data})
  },
}))
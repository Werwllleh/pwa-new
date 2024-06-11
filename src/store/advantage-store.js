import { create } from 'zustand';
import {apiGetAdvantages} from "../api/advantagesApi";

export const useAdvantageStore = create((set) => ({
  advantages: [],
  getAdvantages: async () => {
    const response = await apiGetAdvantages()
    set({advantages: await response.data.items})
  },
}))
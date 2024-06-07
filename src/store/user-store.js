import { create } from 'zustand';
import axios from "axios";


export const useUserStore = create((set) => ({
  currentUser: {},
  auth: true,
  updateCurrentUser: async () => {
    const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/user`)
    set({currentUser: await response.data})
  },
}))

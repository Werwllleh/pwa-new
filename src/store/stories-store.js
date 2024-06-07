import { create } from 'zustand';
import axios from "axios";

export const useStoriesStore = create((set) => ({
  stories: [],
  updateStories: async () => {
    const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/stories`)
    set({stories: await response.data})
  },
}))
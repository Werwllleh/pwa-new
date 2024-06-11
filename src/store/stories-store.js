import { create } from 'zustand';
import {apiGetStories} from "../api/storiesApi";

export const useStoriesStore = create((set) => ({
  stories: [],
  getStories: async () => {
    const response = await apiGetStories()
    set({stories: await response.data.items})
  },
}))
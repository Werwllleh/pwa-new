import { create } from 'zustand';
import {apiGetReviews} from "../api/reviewsApi";

export const useReviewStore = create((set) => ({
  totalRating: 4,
  totalReviews: 333,
  reviews: [],
  page: 1,
  isLoading: false,
  status: false,
  getReviews: async (page = 1) => {
    set({ isLoading: true });
    const response = await apiGetReviews({ nPageSize: 5, page: page });
    if (response.status === 'success') {
      set((state) => ({
        reviews: page === 1 ? response.data.items : [...state.reviews, ...response.data.items],
        page,
        isLoading: false,
        status: true
      }));
    } else {
      set({
        isLoading: false,
        status: false
      });
    }
  },
}))
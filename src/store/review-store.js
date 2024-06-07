import { create } from 'zustand';
import axios from "axios";

export const useReviewStore = create((set) => ({
  totalRating: 0,
  totalReviews: 0,
  reviews: [],
  page: 1,
  isLoading: false,
  status: false,
  updateTotal: async () => {
    const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/reviews-summary`)
    const result = await response.data
    set({totalRating: result.totalRating, totalReviews: result.totalReviews})
  },
  /*updateReviewsMain: async () => {
    const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/reviews?_page=1&_limit=5`)
    set({reviews: await response.data})
  },*/
  updateReviewsMain: async (page = 1) => {
    set({ isLoading: true });
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/reviews`, {
      params: { nPageSize: 5, page: page }
    });
    if (response.data.status === 'success') {
      set((state) => ({
        reviews: page === 1 ? response.data.data.items : [...state.reviews, ...response.data.data.items],
        totalReviews: response.data.data.total,
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
import { create } from 'zustand';
import apiClient from "../api/axiosConfig";

export const useChatStore = create((set) => ({
  chat: [],
  selectedMessageId: null,
  replyMessageId: null,
  chatModalOpen: false,
  updateChat: async () => {
    const response = await apiClient.get(`${process.env.REACT_APP_REST_SERVER_URL}/chat`)
    set({chat: await response.data})
  },
  addChatMessage: (data) => set((state) => ({ chat: [...state.chat, data] })),
  updateSelectedMessageId: (data) => set(() => ({ selectedMessageId: data })),
  updateReplyMessageId: (data) => set(() => ({ replyMessageId: data })),
  updateChatModalOpen: (data) => set(() => ({ chatModalOpen: data })),
}))
import { api } from "../config";
import { UseReviewsService } from "./types";

export const useReviewsService: UseReviewsService = () => {
  return {
    getReviewsByBookId: async (bookId) => {
      const response = await api.get(`/reviews/book/${bookId}`);

      return response?.data?.data;
    },
    createReview: async (bookId, data) => {
      const response = await api.post(`/reviews/${bookId}`, data);

      return response?.data?.data;
    },
  };
};

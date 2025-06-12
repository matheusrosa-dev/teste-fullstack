import { api } from "../config";
import { UseBooksService } from "./types";

export const useBooksService: UseBooksService = () => {
  return {
    getTopRatedBooks: async () => {
      const response = await api.get("/books/top");

      return response?.data?.data;
    },
    getBookById: async (bookId) => {
      const response = await api.get(`/books/${bookId}`);

      return response?.data?.data;
    },
  };
};

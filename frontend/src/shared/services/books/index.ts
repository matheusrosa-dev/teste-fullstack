import { api } from "../config";
import { UseBooksService } from "./types";

export const useBooksService: UseBooksService = () => {
  return {
    getTopRatedBooks: async () => {
      const { data } = await api.get("/books/top");

      return data?.data;
    },
  };
};

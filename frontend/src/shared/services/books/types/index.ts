type GetTopRatedBooks = () => Promise<{
  items: Array<{
    id: string;
    title: string;
    description: string;
    author: string;
    avgRating: number;
    totalReviews: number;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}>;

export type UseBooksService = () => {
  getTopRatedBooks: GetTopRatedBooks;
};

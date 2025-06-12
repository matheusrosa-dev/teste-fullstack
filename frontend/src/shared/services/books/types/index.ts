type GetTopRatedBooks = () => Promise<
  {
    id: string;
    title: string;
    description: string;
    author: string;
    avgRating: number;
    totalReviews: number;
  }[]
>;

export type UseBooksService = () => {
  getTopRatedBooks: GetTopRatedBooks;
};

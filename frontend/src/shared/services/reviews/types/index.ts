type GetReviewsByBookId = (bookId: string) => Promise<
  {
    id: string;
    rating: number;
    comment: string;
    bookId: string;
  }[]
>;

export type UseReviewsService = () => {
  getReviewsByBookId: GetReviewsByBookId;
};

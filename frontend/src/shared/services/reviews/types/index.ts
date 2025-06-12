type GetReviewsByBookId = (bookId: string) => Promise<
  {
    id: string;
    rating: number;
    comment: string;
    bookId: string;
  }[]
>;

type CreateReview = (
  bookId: string,
  data: { rating: number; comment: string }
) => Promise<{
  id: string;
  rating: number;
  comment: string;
  bookId: string;
}>;

export type UseReviewsService = () => {
  getReviewsByBookId: GetReviewsByBookId;
  createReview: CreateReview;
};

import { Spinner } from "@/components";
import { useReviewsService } from "@/shared/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import StarRatings from "react-star-ratings";
import { StarsRating } from "../stars-rating";

type Props = {
  bookId: string;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

export function Reviews({ bookId, isSubmitting, setIsSubmitting }: Props) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const { getReviewsByBookId, createReview } = useReviewsService();
  const queryClient = useQueryClient();

  const { data: reviews, ...queryProps } = useQuery({
    queryKey: ["book", bookId, "reviews"],
    queryFn: () => getReviewsByBookId(bookId || ""),
    enabled: !!bookId,
    refetchOnWindowFocus: false,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;
    if (!rating) return;

    setIsSubmitting(true);

    try {
      await createReview(bookId, { rating, comment: comment });

      setComment("");
      setRating(1);

      queryProps.refetch();
      queryClient.invalidateQueries({
        queryKey: ["top-rated-books"],
      });
      queryClient.invalidateQueries({
        queryKey: ["book", bookId],
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = queryProps.isLoading || queryProps.isRefetching;

  return (
    <section>
      <h2 className="text-xl font-bold text-center">Reviews</h2>

      <div className="flex flex-col gap-2 mt-2 h-80 overflow-y-auto">
        {isLoading && (
          <div className="flex justify-center h-full">
            <Spinner />
          </div>
        )}

        {!isLoading && (
          <>
            <form className="flex flex-col" onSubmit={onSubmit}>
              <p className="text-lg font-medium">Do your review</p>
              <textarea
                disabled={isSubmitting}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border border-gray-200 bg-gray-100 w-full min-h-30 max-h-40 rounded-md p-4  "
                placeholder="Write here..."
              />

              <div className="mx-auto my-2">
                <StarRatings
                  rating={rating}
                  starRatedColor="#d18800"
                  starEmptyColor="gray"
                  starHoverColor="#d18800"
                  changeRating={setRating}
                  numberOfStars={5}
                  starDimension="24px"
                  starSpacing=""
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-4 py-2 rounded-lg mx-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </form>

            <hr className="opacity-25 mb-2" />

            {reviews?.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-md p-4 bg-gray-100 flex flex-col gap-2"
              >
                <p>{review.comment}</p>
                <div className="ml-auto">
                  <StarsRating
                    avgRating={review?.rating || 0}
                    bookId={review?.id || ""}
                    onlyStars
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

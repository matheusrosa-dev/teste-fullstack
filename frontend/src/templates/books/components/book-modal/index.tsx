import { ModalWrapper, Spinner } from "@/components";
import { FiX } from "react-icons/fi";
import { StarsRating } from "../stars-rating";
import { Book } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useReviewsService } from "@/shared/services";
import { FormEvent, FormEventHandler, useState } from "react";
import StarRatings from "react-star-ratings";

type Props = {
  book: Book | null;
  onClose: () => void;
};

export function BookModal({ book, onClose }: Props) {
  const [textareaValue, setTextareaValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [starRatingValue, setStarRatingValue] = useState(1);

  const { getReviewsByBookId } = useReviewsService();

  const { data: reviews, ...queryProps } = useQuery({
    queryKey: ["book", book?.id, "reviews"],
    queryFn: () => getReviewsByBookId(book?.id || ""),
    enabled: !!book,
    refetchOnWindowFocus: false,
  });

  const isLoading = queryProps.isLoading || queryProps.isRefetching;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!textareaValue.trim()) return;
    if (!starRatingValue) return;

    setIsSubmitting(true);

    try {
      console.log(textareaValue);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTextareaValue("");
    } catch {
      console.log("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper isOpen={!!book} onClose={isSubmitting ? () => {} : onClose}>
      <div className="flex flex-col w-[90vw] md:w-140 ">
        <header className="flex justify-end">
          <button
            type="button"
            className="cursor-pointer"
            onClick={isSubmitting ? () => {} : onClose}
          >
            <FiX size={24} />
          </button>
        </header>

        <h3 className="font-bold text-center text-3xl ">{book?.title}</h3>

        <h3 className="font-bold text-center mb-4 text-[#4f4f58] text-xl">
          {book?.author}
        </h3>

        <p className="max-w-70 mb-4 text-center text-lg mx-auto">
          {book?.description}
        </p>

        <StarsRating avgRating={book?.avgRating || 0} bookId={book?.id || ""} />

        <span className="text-center font-medium">
          {book?.totalReviews} Ratings
        </span>

        <hr className="my-4" />

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
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    className="border border-gray-200 bg-gray-100 w-full min-h-30 max-h-40 rounded-md p-4  "
                    placeholder="Write here..."
                  />

                  <div className="mx-auto mt-2">
                    <StarRatings
                      rating={starRatingValue}
                      starRatedColor="#d18800"
                      starEmptyColor="gray"
                      starHoverColor="#d18800"
                      changeRating={setStarRatingValue}
                      numberOfStars={5}
                      starDimension="24px"
                      starSpacing=""
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-4 py-2 rounded-lg ml-auto mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
      </div>
    </ModalWrapper>
  );
}

import { ModalWrapper, Spinner } from "@/components";
import { FiX } from "react-icons/fi";
import { StarsRating } from "../stars-rating";
import { Book } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useReviewsService } from "@/shared/services";

type Props = {
  book: Book | null;
  onClose: () => void;
};

export function BookModal({ book, onClose }: Props) {
  const { getReviewsByBookId } = useReviewsService();

  const { data: reviews, ...queryProps } = useQuery({
    queryKey: ["book", book?.id, "reviews"],
    queryFn: () => getReviewsByBookId(book?.id || ""),
    enabled: !!book,
    refetchOnWindowFocus: false,
  });

  const isLoading = queryProps.isLoading || queryProps.isRefetching;

  return (
    <ModalWrapper isOpen={!!book} onClose={onClose}>
      <div className="flex flex-col w-140">
        <header className="flex justify-end">
          <button type="button" className="cursor-pointer" onClick={onClose}>
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

            {!isLoading &&
              reviews?.map((review) => (
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
          </div>
        </section>
      </div>
    </ModalWrapper>
  );
}

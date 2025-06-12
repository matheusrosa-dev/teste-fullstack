import { ModalWrapper } from "@/components";
import { FiX } from "react-icons/fi";
import { StarsRating } from "../stars-rating";
import { useQuery } from "@tanstack/react-query";
import { useBooksService } from "@/shared/services";
import { useState } from "react";
import { Reviews } from "../reviews";

type Props = {
  bookId: string | null;
  onClose: () => void;
};

export function BookModal({ bookId, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getBookById } = useBooksService();

  const { data: book } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBookById(bookId || ""),
    refetchOnWindowFocus: false,
    enabled: !!bookId,
  });

  return (
    <ModalWrapper isOpen={!!bookId} onClose={isSubmitting ? () => {} : onClose}>
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

        <Reviews
          bookId={book?.id || ""}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </ModalWrapper>
  );
}

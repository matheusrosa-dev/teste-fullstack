import { Book } from "../../types";
import { StarsRating } from "../stars-rating";

type Props = {
  book: Book;
  onClick: () => void;
};

export function BookCard({ book, onClick }: Props) {
  return (
    <>
      <article
        className="flex flex-col p-4 bg-white shadow rounded-2xl hover:scale-110 duration-150 hover:shadow-2xl cursor-pointer"
        onClick={onClick}
      >
        <h3 className="font-bold text-center text-lg ">{book.title}</h3>

        <h3 className="font-bold text-center mb-4 text-[#4f4f58]">
          {book.author}
        </h3>

        <p className="max-w-70 mb-4 text-center">{book.description}</p>

        <StarsRating avgRating={book.avgRating} bookId={book.id} />

        <span className="text-center font-medium">
          {book.totalReviews} Ratings
        </span>
      </article>
    </>
  );
}

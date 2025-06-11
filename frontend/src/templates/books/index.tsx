"use client";

import { useBooksService } from "@/shared/services";
import { useQuery } from "@tanstack/react-query";
import { IconType } from "react-icons";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const BOOKS_MOCK = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
    avgRating: 4.5,
  },
  {
    id: "2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "The story of a millionaire and his obsession with a young woman.",
    avgRating: 4,
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A classic romantic novel about manners, marriage, and morality.",
    avgRating: 5,
  },
  {
    id: "4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
    avgRating: 4,
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "The story of a millionaire and his obsession with a young woman.",
    avgRating: 5,
  },
  {
    id: "6",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A classic romantic novel about manners, marriage, and morality.",
    avgRating: 3.8,
  },
];

export function Books() {
  const renderStars = (avgRating: number) => {
    const stars: IconType[] = [];

    const integerPart = Math.floor(avgRating);
    const decimalPart = avgRating - integerPart;

    stars.push(...Array(integerPart).fill(BsStarFill));

    if (decimalPart >= 0.5) {
      stars.push(BsStarHalf);
    }

    if (integerPart < 5 && decimalPart < 0.5) {
      stars.push(BsStar);
    }

    if (stars.length < 5) {
      stars.push(...Array(5 - stars.length).fill(BsStar));
    }

    return stars;
  };

  const { getTopRatedBooks } = useBooksService();

  const { data } = useQuery({
    queryKey: ["top-rated-books"],
    queryFn: getTopRatedBooks,
  });

  console.log(data);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-center ">Top Rated Books</h2>

      <section className="grid grid-cols-4 gap-10 mx-auto my-8">
        {BOOKS_MOCK.map((book) => (
          <article
            key={book.id}
            className="flex flex-col p-4 bg-white shadow rounded-2xl hover:scale-110 duration-150 hover:shadow-2xl cursor-pointer"
          >
            <h3 className="font-bold text-center text-lg ">{book.title}</h3>

            <h3 className="font-bold text-center mb-4 text-[#4f4f58]">
              {book.author}
            </h3>

            <p className="max-w-70 mb-4 text-center">{book.description}</p>

            <div className="flex mt-auto mx-auto items-center">
              <p className="text-center pt-2 underline font-bold text-yellow-600 mb-[0.3rem] mr-2">
                {book.avgRating}
              </p>

              {renderStars(book.avgRating).map((StarIcon, index) => (
                <StarIcon
                  className="text-yellow-600"
                  key={`${book.id}-${index}`}
                />
              ))}
            </div>

            <span className="text-center font-medium">100 Ratings</span>
          </article>
        ))}
      </section>

      {/* TODO: validar se existe mais livros */}
      <div className="mx-auto">
        <button className="mt-10 bg-[#2b2b30] text-white py-2 px-4 rounded cursor-pointer">
          Load more
        </button>
      </div>
    </div>
  );
}

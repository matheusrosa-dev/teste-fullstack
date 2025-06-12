"use client";

import { useBooksService } from "@/shared/services";
import { useQuery } from "@tanstack/react-query";
import { BookCard, BookModal } from "./components";
import { useState } from "react";

export function Books() {
  const [bookIdOpen, setBookIdOpen] = useState("");

  const { getTopRatedBooks } = useBooksService();

  const { data: books } = useQuery({
    queryKey: ["top-rated-books"],
    queryFn: getTopRatedBooks,
    initialData: [],
  });

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center">Top Rated Books</h2>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-auto my-8 px-10">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => setBookIdOpen(book.id)}
            />
          ))}
        </section>
      </div>

      <BookModal bookId={bookIdOpen} onClose={() => setBookIdOpen("")} />
    </>
  );
}

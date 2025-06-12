import { useBooksService } from "@/shared/services";
import { Books as BooksTemplate } from "@/templates";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Books() {
  const queryClient = new QueryClient();

  const { getTopRatedBooks } = useBooksService();

  await queryClient.prefetchQuery({
    queryKey: ["top-rated-books"],
    queryFn: getTopRatedBooks,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BooksTemplate />
    </HydrationBoundary>
  );
}

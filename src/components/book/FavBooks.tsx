import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import BookEdit from "./BookEdit";
import BookCreate from "./BookCreate";
import { BookOpen } from "lucide-react";
export type FavBook = {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  image: string | null;
  category: string;
  pageCount: number | null;
  moods: { id: string; name: string }[];
};
function FavBooks() {
  const [books, setBooks] = useState<FavBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/books/favbooks");
      setBooks(response.data);

      // to show the loading page for 1.5 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ground dark:bg-night">
        <div>
          <Loader />
        </div>
      </div>
    );
  }
  if (books.length === 0) {
    return <p className="text-soft">No books in your archive yet.</p>;
  }
  return (
    <>
    <div className="grid gap-4">
 {books.map((book) => (
  <div key={book.id} className="flex items-center gap-4">
    {book.image ? (
      <img
        src={book.image}
        loading="lazy"
        className="h-24 w-16 shrink-0 rounded-md object-cover shadow-sm"
      />
    ) : (
      <div className="grid h-24 w-16 shrink-0 place-items-center rounded-md bg-ground text-ink-soft dark:bg-night-surface dark:text-night-ink-soft">
        <BookOpen className="size-6" />
      </div>
    )}

    <div className="flex-1">
      <p className="font-display text-xl font-bold text-ink dark:text-night-ink">{book.title}</p>
      {book.author && <p className="text-soft">{book.author}</p>}
    </div>

    <BookEdit favbookId={book.id} onUpdated={getData} />
  </div>
))}
    </div>
      <BookCreate onCreated={getData} /></>
  );
}
export default FavBooks;

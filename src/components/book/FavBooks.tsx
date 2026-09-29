import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import BookEdit from "./BookEdit";
import BookCreate from "./BookCreate";
import { BookOpen } from "lucide-react";
import DeleteAlart from "../forAll/DeleteAlart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  const handleDelete = async (favbookId: string) => {
    await service.delete(`/books/favbooks/${favbookId}`);
    getData();
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
      <BookCreate onCreated={getData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto justify-items-center gap-10 my-12 overflow-hidden">
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger className="shrink-0 cursor-pointer rounded-md">
                {book.image ? (
                  <img
                    src={book.image}
                    loading="lazy"
                    className="h-24 w-16 rounded-md object-cover shadow-sm"
                  />
                ) : (
                  <span className="grid h-24 w-16 place-items-center rounded-md bg-ground text-ink-soft dark:bg-night-surface dark:text-night-ink-soft">
                    <BookOpen className="size-6" />
                    <span className="sr-only">
                      Show details of {book.title}
                    </span>
                  </span>
                )}
              </DialogTrigger>

              <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
                    {book.title}
                  </DialogTitle>
                  {book.author && <p className="text-soft">{book.author}</p>}
                </DialogHeader>

                {book.image && (
                  <img
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    referrerPolicy="no-referrer"
                    className="mx-auto max-h-80 rounded-xl object-contain shadow-sm"
                  />
                )}

                {book.description && (
                  <DialogDescription className="text-base text-ink dark:text-night-ink">
                    {book.description}
                  </DialogDescription>
                )}
                <p>Category: {book.category}</p>
                <p className="text-soft">
                  {book.moods.map((mood) => mood.name).join(", ")}
                </p>
              </DialogContent>
            </Dialog>

            <div className="flex-1">
              <p className="font-display text-xl font-bold text-ink dark:text-night-ink">
                {book.title}
              </p>
              {book.author && <p className="text-soft">{book.author}</p>}
            </div>

            <BookEdit favbookId={book.id} onUpdated={getData} />
            <DeleteAlart onDelete={() => handleDelete(book.id)} />
          </div>
        ))}
      </div>
    </>
  );
}
export default FavBooks;

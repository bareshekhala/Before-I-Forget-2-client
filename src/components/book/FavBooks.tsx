import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import BookEdit from "./BookEdit";
import BookCreate from "./BookCreate";
import DeleteAlart from "../forAll/DeleteAlart";
import BookCard from "./BookCard";
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
    return (
      <>
        <p className="text-soft">No books in your archive yet.</p>
        <BookCreate onCreated={getData} />
      </>
    );

  }
return (
  <>
    <BookCreate onCreated={getData} />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto justify-items-center gap-10 my-12 overflow-hidden">
      {books.map((book) => (
        <div key={book.id}>
          <BookCard book={book} />

          <BookEdit
            favbookId={book.id}
            onUpdated={getData}
          />

          <DeleteAlart
            onDelete={() => handleDelete(book.id)}
          />
        </div>
      ))}
    </div>
  </>
);
}
export default FavBooks;

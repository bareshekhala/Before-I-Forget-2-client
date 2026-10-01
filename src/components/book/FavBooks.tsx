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
      <div className="grid place-items-center py-24">
        <Loader />
      </div>
    );
  }
  if (books.length === 0) {
    return (
      <div className="empty-box">
        <p>No books in your archive yet.</p>
        <BookCreate onCreated={getData} />
      </div>
    );

  }
return (
  <>
    <div className="mt-3 flex justify-end xl:absolute xl:top-0.5 xl:right-0 xl:mt-0">
      <BookCreate onCreated={getData} />
    </div>

    <div className="card-grid">
      {books.map((book) => (
        <div key={book.id} className="grid w-full max-w-56 content-start gap-2">
          <BookCard book={book} />

          <div className="flex gap-2">
            <BookEdit
              favbookId={book.id}
              onUpdated={getData}
            />

            <DeleteAlart
              onDelete={() => handleDelete(book.id)}
            />
          </div>
        </div>
      ))}
    </div>
  </>
);
}
export default FavBooks;

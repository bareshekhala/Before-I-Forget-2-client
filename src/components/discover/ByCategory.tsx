import { useState, type MouseEvent } from "react";
import DiscoverSearchBar from "./DiscoverSearchBar";
import BookCard from "../book/BookCard";
import MovieCard from "../movie/MovieCard";
import service from "@/services/service.index";
import { categories } from "../book/Categories";

type Book = {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  image: string | null;
  category: string;
  pageCount: number | null;
  moods: { id: string; name: string }[];
};

type Movie = {
  id: string;
  title: string;
  overview: string | null;
  poster_path: string | null;
  category: string;
  moods: { id: string; name: string }[];
};

function DiscoveredPageCategory() {
  const [suggestions1, setSuggestions1] = useState<Book[]>([]);
  const [suggestions2, setSuggestions2] = useState<Movie[]>([]);
  const [suggestions11, setSuggestions11] = useState<Book[]>([]);
  const [suggestions22, setSuggestions22] = useState<Movie[]>([]);

  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  const handleCategory = async (e: MouseEvent<HTMLButtonElement>) => {
    const selectedCategory = e.currentTarget.value;

    setCategory(selectedCategory);

    try {
      const response1 = await service.get("/books");
      const response11 = await service.get("/books/favbooks");

      const response2 = await service.get("/movies");
      const response22 = await service.get("/movies/favmovies");

      const result1 = response1.data.filter((book: Book) => {
        return book.category.toLowerCase() === selectedCategory;
      });

      const result11 = response11.data.filter((book: Book) => {
        return book.category.toLowerCase() === selectedCategory;
      });

      const result2 = response2.data.filter((movie: Movie) => {
        return movie.category.toLowerCase() === selectedCategory;
      });

      const result22 = response22.data.filter((movie: Movie) => {
        return movie.category.toLowerCase() === selectedCategory;
      });

      setSuggestions1(result1);
      setSuggestions11(result11);

      setSuggestions2(result2);
      setSuggestions22(result22);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <DiscoverSearchBar
          query={query}
          setQuery={setQuery}
        />
      </div>

      <div className="mt-15 px-2 text-center">
        <h1 className="text-3xl italic">
          Select a Category
        </h1>

        <p className="px-2 pt-2 italic">
          Select a Category to Discover What You Might Need Right Now
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
        {categories.map((eachCategory) => (
          <button
            key={eachCategory.value}
            value={eachCategory.value}
            onClick={handleCategory}
            className="mx-auto my-15 px-5 py-2"
          >
            {eachCategory.label}
          </button>
        ))}
      </div>

      <div className="mx-auto my-30 grid max-w-6xl grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">

        {suggestions1
          .filter((book) =>
            book.title
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}

        {suggestions2
          .filter((movie) =>
            movie.title
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        {suggestions11
          .filter((fbook) => {
            return (
              !suggestions1.some(
                (book) => book.id === fbook.id
              ) &&
              fbook.title
                .toLowerCase()
                .includes(query.toLowerCase())
            );
          })
          .map((fbook) => (
            <BookCard
              key={fbook.id}
              book={fbook}
            />
          ))}

        {suggestions22
          .filter((fmovie) => {
            return (
              !suggestions2.some(
                (movie) => movie.id === fmovie.id
              ) &&
              fmovie.title
                .toLowerCase()
                .includes(query.toLowerCase())
            );
          })
          .map((fmovie) => (
            <MovieCard
              key={fmovie.id}
              movie={fmovie}
            />
          ))}

      </div>
    </>
  );
}

export default DiscoveredPageCategory;
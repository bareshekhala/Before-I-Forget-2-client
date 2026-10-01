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

type DiscoveredPageCategoryProps = {
  shelf: string;
};

function DiscoveredPageCategory({ shelf }: DiscoveredPageCategoryProps) {
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
    <div className="grid items-start gap-5 lg:grid-cols-[236px_minmax(0,1fr)] lg:gap-8">
      <div className="glass flex flex-wrap gap-1 p-2.5 lg:sticky lg:top-4 lg:grid lg:max-h-[calc(100svh-2rem)] lg:gap-0.5 lg:overflow-y-auto">
        {categories.map((eachCategory) => (
          <button
            key={eachCategory.value}
            value={eachCategory.value}
            onClick={handleCategory}
            className={category === eachCategory.value ? "nav-link active" : "nav-link"}
          >
            {eachCategory.label}
          </button>
        ))}
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cobalt/15 pb-4.5 dark:border-white/10">
          <div className="min-w-0 grow basis-64">
            <h2 className="font-display text-2xl leading-tight font-[760] tracking-[-0.015em] text-ink dark:text-night-ink">
              Select a Category
            </h2>

            <p className="text-soft pt-1 text-base">
              Select a Category to Discover What You Might Need Right Now
            </p>
          </div>
          <DiscoverSearchBar
            query={query}
            setQuery={setQuery}
          />
        </div>

        {shelf === "Songs" && (
          <p className="text-soft pt-5 text-base">Songs don't have a category.</p>
        )}

        <div className="card-grid">

          {(shelf === "All" || shelf === "Books") &&
            suggestions1
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

          {(shelf === "All" || shelf === "Movies") &&
            suggestions2
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

          {(shelf === "All" || shelf === "Books") &&
            suggestions11
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

          {(shelf === "All" || shelf === "Movies") &&
            suggestions22
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
      </div>
    </div>
  );
}

export default DiscoveredPageCategory;
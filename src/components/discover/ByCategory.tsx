import { useEffect, useState, type MouseEvent } from "react";
import DiscoverSearchBar from "./DiscoverSearchBar";
import BookCard from "../book/BookCard";
import MovieCard from "../movie/MovieCard";
import service from "@/services/service.index";
import { categories } from "../book/Categories";
import { PlusIcon, Check } from "lucide-react";

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


  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [favTitles, setFavTitles] = useState<string[]>([]);

  useEffect(() => {
    const getFavTitles = async () => {
      try {
        const response1 = await service.get("/books/favbooks");
        const response2 = await service.get("/movies/favmovies");
        setFavTitles([
          ...response1.data.map((book: Book) => book.title),
          ...response2.data.map((movie: Movie) => movie.title),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    getFavTitles();
  }, []);

  const handleCategory = async (e: MouseEvent<HTMLButtonElement>) => {
    const selectedCategory = e.currentTarget.value;

    setCategory(selectedCategory);

    try {
      const response1 = await service.get("/books");
      const response2 = await service.get("/movies");

      const result1 = response1.data.filter((book: Book) => {
        return book.category.toLowerCase() === selectedCategory;
      });
      const result2 = response2.data.filter((movie: Movie) => {
        return movie.category.toLowerCase() === selectedCategory;
      });

      setSuggestions1(result1);
      setSuggestions2(result2);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePicked = async (picked: Book | Movie) => {
    try {
      if ("author" in picked) {
        await service.post("/books/favbooks", {
          title: picked.title,
          author: picked.author,
          description: picked.description,
          image: picked.image,
          category: picked.category,
          pageCount: picked.pageCount,
          moods: picked.moods.map((mood) => mood.name),
        });
        setFavTitles((prev) => [...prev, picked.title]);
      }
      if ("overview" in picked) {
        await service.post("/movies/favmovies", {
          title: picked.title,
          overview: picked.overview,
          poster_path: picked.poster_path,
          category: picked.category,
          moods: picked.moods.map((mood) => mood.name),
        });
        setFavTitles((prev) => [...prev, picked.title]);
      }
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
                <div key={book.id} className="relative w-full max-w-56">
                  <button
                    type="button"
                    disabled={favTitles.includes(book.title)}
                    title="Add to favorites"
                    onClick={() => handlePicked(book)}
                    className="absolute top-2 right-2 z-20 grid size-9 place-items-center rounded-full bg-white shadow-md dark:bg-night-surface"
                  >
                    {favTitles.includes(book.title) ? (
                      <Check className="size-5 text-green-500" />
                    ) : (
                      <PlusIcon className="size-5" />
                    )}
                  </button>

                  <BookCard book={book} />
                </div>
              ))}

          {(shelf === "All" || shelf === "Movies") &&
            suggestions2
              .filter((movie) =>
                movie.title
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
              .map((movie) => (
                <div key={movie.id} className="relative w-full max-w-56">
                  <button
                    type="button"
                    disabled={favTitles.includes(movie.title)}
                    title="Add to favorites"
                    onClick={() => handlePicked(movie)}
                    className="absolute top-2 right-2 z-20 grid size-9 place-items-center rounded-full bg-white shadow-md dark:bg-night-surface"
                  >
                    {favTitles.includes(movie.title) ? (
                      <Check className="size-5 text-green-500" />
                    ) : (
                      <PlusIcon className="size-5" />
                    )}
                  </button>

                  <MovieCard movie={movie} />
                </div>
              ))}

        </div>
      </div>
    </div>
  );
}

export default DiscoveredPageCategory;
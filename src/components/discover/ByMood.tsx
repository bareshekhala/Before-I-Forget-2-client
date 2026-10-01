import service from "@/services/service.index";
import { useEffect, useState, type MouseEvent } from "react";
import DiscoverSearchBar from "./DiscoverSearchBar";
import SongCard from "../song/SongCard";
import BookCard from "../book/BookCard";
import MovieCard from "../movie/MovieCard";
import { PlusIcon, Check, Shuffle } from "lucide-react";
import Loader from "../Loader";

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

type Song = {
  id: string;
  title: string;
  singerOrComposer: string | null;
  image: string | null;
  url: string | null;
  moods: { id: string; name: string }[];
};

type Mood = {
  id: string;
  name: string;
};

type DiscoverMProps = {
  shelf: string;
};

function DiscoverM({ shelf }: DiscoverMProps) {
  const [suggestions1, setSuggestions1] = useState<Book[]>([]);
  const [suggestions2, setSuggestions2] = useState<Movie[]>([]);
  const [suggestions3, setSuggestions3] = useState<Song[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("");
  const [favTitles, setFavTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //getting the moods
  useEffect(() => {
    const getMoods = async () => {
      try {
        const response = await service.get("/moods");
        setMoods(response.data);
        setIsLoading(false);
        const response2 = await service.get("/books/favbooks");
        const response3 = await service.get("/movies/favmovies");
        const response4 = await service.get("/songs/favsongs");
        setFavTitles([
          ...response2.data.map((book: Book) => book.title),
          ...response3.data.map((movie: Movie) => movie.title),
          ...response4.data.map((song: Song) => song.title),
        ]);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getMoods();
  }, []);

  const handleMood = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedMood = e.currentTarget.value;
    setMood(selectedMood);
    try {
      const response1 = await service.get("/books");
      const response2 = await service.get("/movies");
      const response3 = await service.get("/songs");

      const result1 = response1.data.filter((book: Book) => {
        return book.moods.some((mood) => mood.id === selectedMood);
      });

      const result2 = response2.data.filter((movie: Movie) => {
        return movie.moods.some((mood) => mood.id === selectedMood);
      });
      const result3 = response3.data.filter((song: Song) => {
        return song.moods.some((mood) => mood.id === selectedMood);
      });

      setSuggestions1(result1);
      setSuggestions2(result2);
      setSuggestions3(result3);
    } catch (error) {
      console.log(error);
    }
  };
//if the user wants a random suggestion
  const handleSurprise = async () => {
    setMood("");
    setQuery("");
    try {
      const response1 = await service.get("/books");
      const response2 = await service.get("/movies");
      const response3 = await service.get("/songs");

      const randomBook = response1.data[Math.floor(Math.random() * response1.data.length)];
      const randomMovie = response2.data[Math.floor(Math.random() * response2.data.length)];
      const randomSong = response3.data[Math.floor(Math.random() * response3.data.length)];

      setSuggestions1([randomBook]);
      setSuggestions2([randomMovie]);
      setSuggestions3([randomSong]);
    } catch (error) {
      console.log(error);
    }
  };

  //so with this user can add sth in the database to her archive
  const handlePicked = async (picked: Book | Movie | Song) => {
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
      if ("singerOrComposer" in picked) {
        await service.post("/songs/favsongs", {
          title: picked.title,
          singerOrComposer: picked.singerOrComposer,
          image: picked.image,
          url: picked.url,
          moods: picked.moods.map((mood) => mood.name),
        });
        setFavTitles((prev) => [...prev, picked.title]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
  return (
    <div className="grid place-items-center py-24">
      <Loader />
    </div>
  );
}
  return (
    <div className="grid items-start gap-5 lg:grid-cols-[236px_minmax(0,1fr)] lg:gap-8">
      <div className="glass flex flex-wrap gap-1 p-2.5 lg:sticky lg:top-4 lg:grid lg:max-h-[calc(100svh-2rem)] lg:gap-0.5 lg:overflow-y-auto">
        {moods.map((each) => {
          return (
            <button
              key={each.id}
              value={each.id}
              onClick={handleMood}
              className={mood === each.id ? "nav-link active" : "nav-link"}
            >
              {each.name}
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cobalt/15 pb-4.5 dark:border-white/10">
          <div className="min-w-0 grow basis-64">
            <h2 className="font-display text-2xl leading-tight font-[760] tracking-[-0.015em] text-ink dark:text-night-ink">
              How Are You Feeling Today?
            </h2>
            <p className="text-soft pt-1 text-base">
              Select a Mood to Discover What You Might Need Right Now
            </p>
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <DiscoverSearchBar query={query} setQuery={setQuery} />
            <button
              onClick={handleSurprise}
              className="flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-ink-soft/60 bg-white px-4 text-[14.5px] font-semibold text-ink hover:border-ink dark:border-night-ink-soft/50 dark:bg-night-surface dark:text-night-ink dark:hover:border-night-ink"
            >
              <Shuffle className="size-4.5" />
              Surprise me
            </button>
          </div>
        </div>

        {shelf !== "Songs" && (
          <div className="card-grid">
            {(shelf === "All" || shelf === "Books") &&
              suggestions1
                .filter((book) =>
                  book.title.toLowerCase().includes(query.toLowerCase()),
                )
                .map((book) => {
                  return (
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
                  );
                })}
            {(shelf === "All" || shelf === "Movies") &&
              suggestions2
                .filter((movie) =>
                  movie.title.toLowerCase().includes(query.toLowerCase()),
                )
                .map((movie) => {
                  return (
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
                  );
                })}
          </div>
        )}

        {(shelf === "All" || shelf === "Songs") && (
          <div className="grid gap-x-5 gap-y-6.5 pt-5 sm:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
            {suggestions3
              .filter((song) =>
                song.title.toLowerCase().includes(query.toLowerCase()),
              )
              .map((song) => {
                return (
                  <div key={song.id} className="relative">
                    <button
                      type="button"
                      disabled={favTitles.includes(song.title)}
                      title="Add to favorites"
                      onClick={() => handlePicked(song)}
                      className="absolute top-5 left-5 z-20 grid size-9 place-items-center rounded-full bg-white shadow-md dark:bg-night-surface"
                    >
                      {favTitles.includes(song.title) ? (
                        <Check className="size-5 text-green-500" />
                      ) : (
                        <PlusIcon className="size-5" />
                      )}
                    </button>

                    <SongCard song={song} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscoverM;

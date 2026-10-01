import service from "@/services/service.index";
import { useEffect, useState, type MouseEvent } from "react";
import DiscoverSearchBar from "./DiscoverSearchBar";
import SongCard from "../song/SongCard";
import BookCard from "../book/BookCard";
import MovieCard from "../movie/MovieCard";
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
function DiscoverM() {
  const [suggestions1, setSuggestions1] = useState<Book[]>([]);
  const [suggestions2, setSuggestions2] = useState<Movie[]>([]);
  const [suggestions3, setSuggestions3] = useState<Song[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("");


  //getting the moods
  useEffect(() => {
    const getMoods = async () => {
      try {
        const response = await service.get(
          "/moods",
        );

        setMoods(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMoods();
  }, []);



  const handleMood = async (e: MouseEvent<HTMLButtonElement>) => {
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

  return (
    <>
      <div>
        <DiscoverSearchBar query={query} setQuery={setQuery} />
      </div>

      <div className="text-center mt-15 px-2">
        <h1 className="italic text-3xl">How Are You Feeling Today?</h1>
        <p className=" italic pt-2">
          Select a Mood to Discover What You Might Need Right Now
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3  max-w-2xl mx-auto">
        {moods.map((mood) => {
          return (
            <button
              key={mood.id}
              value={mood.id}
              onClick={handleMood}
              className="mx-auto my-15 px-5 py-2"
            >
              {mood.name}
            </button >
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  max-w-6xl mx-auto justify-items-center gap-10 my-30">
        {suggestions1
          .filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()),
          )
          .map((book) => {
            return <BookCard key={book.id} book = {book} />;
          })}
        {suggestions2
          .filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()),
          )
          .map((movie) => {
            return <MovieCard key={movie.id} movie = {movie} />;
          })}

        {suggestions3
          .filter((song) =>
            song.title.toLowerCase().includes(query.toLowerCase()),
          )
          .map((song) => {
            return <SongCard key={song.id} song = {song} />;
          })}
      </div>
    </>
  );
}

export default DiscoverM;

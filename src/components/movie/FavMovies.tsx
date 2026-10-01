import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import MovieCreate from "./MovieCreate";
import MovieEdit from "./MovieEdit";
import DeleteAlart from "../forAll/DeleteAlart";
import MovieCard from "./MovieCard";

export type FavMovie = {
  id: string;
  title: string;
  overview: string | null;
  poster_path: string | null;
  category: string;
  moods: { id: string; name: string }[];
};
function FavMovies() {
  const [Movies, setMovies] = useState<FavMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/movies/favmovies");
      setMovies(response.data);

      // to show the loading page for 1.5 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (favmovieId: string) => {
    await service.delete(`/movies/favmovies/${favmovieId}`);
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
  if (Movies.length === 0) {
    return (
      <>
        <p className="text-soft">No Movie in your archive yet.</p>
        <MovieCreate onCreated={getData} />
      </>
    );
  }
  return (
    <>
      <MovieCreate onCreated={getData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto justify-items-center gap-10 my-12 overflow-hidden">
        {Movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />

            <MovieEdit favmovieId={movie.id} onUpdated={getData} />
            <DeleteAlart onDelete={() => handleDelete(movie.id)} />
          </div>
        ))}
      </div>
    </>
  );
}
export default FavMovies;

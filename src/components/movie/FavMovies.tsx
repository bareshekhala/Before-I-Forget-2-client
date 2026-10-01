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
      <div className="grid place-items-center py-24">
        <Loader />
      </div>
    );
  }
  if (Movies.length === 0) {
    return (
      <div className="empty-box">
        <p>No Movie in your archive yet.</p>
        <MovieCreate onCreated={getData} />
      </div>
    );
  }
  return (
    <>
      <div className="mt-3 flex justify-end xl:absolute xl:top-0.5 xl:right-0 xl:mt-0">
        <MovieCreate onCreated={getData} />
      </div>

      <div className="card-grid">
        {Movies.map((movie) => (
          <div key={movie.id} className="grid w-full max-w-56 content-start gap-2">
            <MovieCard movie={movie} />

            <div className="flex gap-2">
              <MovieEdit favmovieId={movie.id} onUpdated={getData} />
              <DeleteAlart onDelete={() => handleDelete(movie.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default FavMovies;

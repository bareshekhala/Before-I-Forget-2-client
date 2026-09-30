import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import MovieCreate from "./MovieCreate";
import MovieEdit from "./MovieEdit";
import { FilmIcon } from "lucide-react";
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
  overview: string | null;
  poster_path: string | null;
  category: string;
  moods: { id: string; name: string }[];
};
function FavMovies() {
  const [Movies, setMovies] = useState<FavBook[]>([]);
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
          <div key={movie.id} className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger className="shrink-0 cursor-pointer rounded-md">
                {movie.poster_path ? (
                  <img
                    src={movie.poster_path}
                    loading="lazy"
                    className="h-24 w-16 rounded-md object-cover shadow-sm"
                  />
                ) : (
                  <span className="grid h-24 w-16 place-items-center rounded-md bg-ground text-ink-soft dark:bg-night-surface dark:text-night-ink-soft">
                    <FilmIcon className="size-6" />
                    <span className="sr-only">
                      Show details of {movie.title}
                    </span>
                  </span>
                )}
              </DialogTrigger>

              <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
                    {movie.title}
                  </DialogTitle>
                </DialogHeader>

                {movie.poster_path && (
                  <img
                    src={movie.poster_path}
                    className="mx-auto max-h-80 rounded-xl object-contain shadow-sm"
                  />
                )}

                {movie.overview && (
                  <DialogDescription className="text-base text-ink dark:text-night-ink">
                    {movie.overview}
                  </DialogDescription>
                )}
                <p>Category: {movie.category}</p>
                <p className="text-soft">
                  {movie.moods.map((mood) => mood.name).join(", ")}
                </p>
              </DialogContent>
            </Dialog>

            <div className="flex-1">
              <p className="font-display text-xl font-bold text-ink dark:text-night-ink">
                {movie.title}
              </p>
            </div>

            <MovieEdit favmovieId={movie.id} onUpdated={getData} />
            <DeleteAlart onDelete={() => handleDelete(movie.id)} />
          </div>
        ))}
      </div>
    </>
  );
}
export default FavMovies;

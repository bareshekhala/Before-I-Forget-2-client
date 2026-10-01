import { FilmIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type MovieCardMovie = {
  id: string;
  title: string;
  overview: string | null;
  poster_path: string | null;
  category: string;
  moods: { id: string; name: string }[];
};

type MovieCardProps = {
  movie: MovieCardMovie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="glass flex w-full max-w-sm items-center gap-4 rounded-2xl p-4">
      <Dialog>
        <DialogTrigger className="shrink-0 cursor-pointer rounded-md">
          {movie.poster_path ? (
            <img
              src={movie.poster_path}
              alt={movie.title}
              loading="lazy"
              className="h-28 w-20 rounded-lg object-cover shadow-sm"
            />
          ) : (
            <div className="grid h-28 w-20 place-items-center rounded-lg bg-ground text-ink-soft dark:bg-night-surface dark:text-night-ink-soft">
              <FilmIcon className="size-6" />
            </div>
          )}
        </DialogTrigger>

        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-bold">
              {movie.title}
            </DialogTitle>
          </DialogHeader>

          {movie.poster_path && (
            <img
              src={movie.poster_path}
              alt={movie.title}
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

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg font-bold text-ink dark:text-night-ink">
          {movie.title}
        </p>

        <p className="mt-1 text-xs text-soft">
          {movie.category}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
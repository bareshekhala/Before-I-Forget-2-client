import { FilmIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  
  // when no image
  const poster = movie.poster_path ? (
    <img src={movie.poster_path}  loading="lazy" />
  ) : (
    <FilmIcon className="size-8" />
  );

  return (
    <Dialog>
      <DialogTrigger className="group grid w-full max-w-56 cursor-pointer content-start gap-2.5 rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">
        <span className="card-stage">{poster}</span>

        <span className="grid gap-0.5 px-0.5">
          <span className="text-soft text-[13px] font-semibold capitalize">
            {movie.category}
          </span>
          <span className="text-[15px] leading-snug font-bold text-ink dark:text-night-ink">
            {movie.title}
          </span>
          
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            {movie.moods.slice(0, 2).map((mood) => (
              <span key={mood.id} className="mood-pill">
                {mood.name}
              </span>
            ))}
            {movie.moods.length > 2 && (
              <span className="mood-pill">+{movie.moods.length - 2}</span>
            )}
          </span>
        </span>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-[min(48rem,calc(100%-2rem))] sm:p-7 dark:bg-night-surface dark:text-night-ink">
        <div className="grid gap-5 sm:grid-cols-[13.75rem_minmax(0,1fr)] sm:gap-7">
          <div className="card-stage max-w-45 sm:max-w-none">{poster}</div>

          <div className="grid content-start gap-2">
            <p className="text-soft flex items-center gap-1.5 text-sm font-semibold">
              <FilmIcon className="size-4" />
              Movie
            </p>
            <DialogTitle className="pr-8 font-display text-[2rem] leading-[1.05] font-[760] tracking-[-0.02em] text-balance">
              {movie.title}
            </DialogTitle>

            <p className="text-soft text-[14.5px] capitalize">
              Category: {movie.category}
            </p>

            <p className="mt-0.5 flex flex-wrap gap-1.5">
              {movie.moods.map((mood) => (
                <span key={mood.id} className="mood-pill">
                  {mood.name}
                </span>
              ))}
            </p>

            {movie.overview && (
              <DialogDescription className="mt-2 text-base leading-relaxed text-ink dark:text-night-ink">
                {movie.overview}
              </DialogDescription>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MovieCard;

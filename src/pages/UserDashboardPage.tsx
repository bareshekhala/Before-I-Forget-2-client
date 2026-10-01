import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { AuthContext } from "../context/auth.context";
import service from "@/services/service.index";
import movieQuote from "popular-movie-quotes";
import day from "../assets/day.png";
import night from "../assets/night.png";

type Movie = {
  id: string;
  title: string;
  overview: string | null;
  poster_path: string | null;
  category: string;
  moods: { id: string; name: string }[];
};

function UserDashboardPage() {
  const auth = useContext(AuthContext);
  const name = auth?.user?.user_metadata.name || "Gorgeous";
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  //from the movie quote package
  const [quote] = useState(() => movieQuote.getSomeRandom(1)[0]);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await service.get("/movies");
        const randomMovie = response.data[Math.floor(Math.random() * response.data.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
  }, []);

  return (
    <div className="mx-auto box-content max-w-295 px-4 pt-4.5 pb-6 lg:px-10 lg:py-6.5">
      <div className="app-backdrop" />

      <div className="relative isolate grid min-h-[70svh] content-between gap-8 overflow-hidden rounded-3xl p-5 sm:p-8 lg:min-h-[calc(100svh-3.25rem)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:content-start lg:p-10">
        <div className="absolute inset-0 -z-10">
          <img src={day} alt="" className="absolute inset-0 size-full object-cover object-bottom" />
          <img
            src={night}
            alt=""
            className="absolute inset-0 size-full object-cover object-bottom opacity-0 transition-opacity duration-1000 dark:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-b from-ground/70 to-transparent lg:bg-linear-to-r dark:from-night/70" />
        </div>

        <div className="text-ink dark:text-night-ink">
          <h1 className="font-display text-4xl leading-none font-bold tracking-tight lg:text-6xl">
            Hello, {name}
          </h1>
          <p className="mt-3 text-lg">{today}</p>
        </div>

        <div className="grid content-start gap-4">
          <div className="glass grid gap-4 p-5 lg:p-6">
            <h2 className="font-display text-2xl leading-tight font-[760] tracking-[-0.015em] text-ink lg:text-3xl dark:text-night-ink">
              Before I forget...
            </h2>
            <Link
              to="/archive"
              className="btn-primary flex w-fit! items-center gap-2"
            >
              <Plus className="size-5" />
              Add something to your archive
            </Link>
          </div>

          <div className="glass grid gap-2 p-5 lg:p-6">
            <p className="text-soft text-sm font-semibold">Movie Quote</p>
            <p className="font-display text-xl font-bold wrap-anywhere text-ink lg:text-2xl dark:text-night-ink">
              "{quote.quote}"
            </p>
            <p className="text-soft text-sm lg:text-base">
              {quote.movie} ({quote.year})
            </p>
          </div>

          {movie && (
            <div className="glass grid gap-3 p-5 lg:p-6">
              <p className="text-soft text-sm font-semibold">Your today's random movie</p>
              <div className="flex items-center gap-4">
                {movie.poster_path && (
                  <img
                    src={movie.poster_path}
                    alt=""
                    className="h-28 w-20 shrink-0 rounded-lg object-cover lg:h-36 lg:w-24"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-display text-xl font-bold wrap-anywhere text-ink lg:text-2xl dark:text-night-ink">
                    {movie.title}
                  </p>
                  <p className="text-soft text-sm capitalize lg:text-base">{movie.category}</p>
                </div>
              </div>
              <Link to="/discover" className="text-link w-fit">
                Want to find something yourself?
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;

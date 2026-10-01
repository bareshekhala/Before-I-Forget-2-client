import { Music } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type SongCardSong = {
  id: string;
  title: string;
  singerOrComposer: string | null;
  image: string | null;
  url: string | null;
  moods: { id: string; name: string }[];
};

type SongCardProps = {
  song: SongCardSong;
};

function SongCard({ song }: SongCardProps) {

  const embedUrl = song.url?.startsWith(
    "https://open.spotify.com/track/"
  )
    ? song.url.replace(
        "open.spotify.com/track/",
        "open.spotify.com/embed/track/"
      )
    : null;

  // if it has a Spotify link
  if (embedUrl) {
    return (
      <div className="grid w-full gap-3 rounded-3xl border border-white/80 bg-white/40 p-3 dark:border-white/15 dark:bg-night-surface/40">
        <iframe
          src={embedUrl}
          title={song.title}
          className="h-88 w-full rounded-2xl"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <p className="flex flex-wrap gap-1.5 px-1 pb-1">
          {song.moods.map((mood) => (
            <span key={mood.id} className="mood-pill">
              {mood.name}
            </span>
          ))}
        </p>
      </div>
    );
  }

  // if it doesn't have a Spotify link
  const cover = song.image ? (
    <img src={song.image} loading="lazy"  />
  ) : (
    <Music className="size-8" />
  );

  return (
    <Dialog>
      <DialogTrigger className="group grid w-full cursor-pointer content-start gap-2.5 rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">
        <span className="card-stage aspect-square!">{cover}</span>

        <span className="grid gap-0.5 px-0.5">
          <span className="text-[15px] leading-snug font-bold text-ink dark:text-night-ink">
            {song.title}
          </span>
          {song.singerOrComposer && (
            <span className="text-soft line-clamp-2 text-sm">
              {song.singerOrComposer}
            </span>
          )}

        
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            {song.moods.slice(0, 2).map((mood) => (
              <span key={mood.id} className="mood-pill">
                {mood.name}
              </span>
            ))}
            {song.moods.length > 2 && (
              <span className="mood-pill">+{song.moods.length - 2}</span>
            )}
          </span>
        </span>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-[min(48rem,calc(100%-2rem))] sm:p-7 dark:bg-night-surface dark:text-night-ink">
        <div className="grid gap-5 sm:grid-cols-[13.75rem_minmax(0,1fr)] sm:gap-7">
          <div className="card-stage aspect-square! max-w-45 sm:max-w-none">{cover}</div>

          <div className="grid content-start gap-2">
            <p className="text-soft flex items-center gap-1.5 text-sm font-semibold">
              <Music className="size-4" />
              Song
            </p>
            <DialogTitle className="pr-8 font-display text-[2rem] leading-[1.05] font-[760] tracking-[-0.02em] text-balance">
              {song.title}
            </DialogTitle>
            {song.singerOrComposer && (
              <p className="text-soft text-[1.05rem]">{song.singerOrComposer}</p>
            )}

            <p className="mt-0.5 flex flex-wrap gap-1.5">
              {song.moods.map((mood) => (
                <span key={mood.id} className="mood-pill">
                  {mood.name}
                </span>
              ))}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SongCard;

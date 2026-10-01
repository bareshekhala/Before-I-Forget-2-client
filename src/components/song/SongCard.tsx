import { Music } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
      <div className="grid w-85 gap-4 rounded-3xl bg-white p-4 shadow-sm dark:bg-night-surface">
        <iframe
          src={embedUrl}
          title={song.title}
          className="h-88 w-full rounded-2xl"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <p className="text-soft">
          {song.moods.map((mood) => mood.name).join(", ")}
        </p>
      </div>
    );
  }

  // if it doesn't have a Spotify link
  return (
    <div className="glass grid w-full max-w-sm gap-4 rounded-2xl p-4">
      <Dialog>
        <DialogTrigger className="cursor-pointer rounded-md">
          {song.image ? (
            <img
              src={song.image}
              alt={song.title}
              loading="lazy"
              className="mx-auto h-60 w-50 rounded-md object-cover shadow-sm"
            />
          ) : (
            <div className="mx-auto grid h-60 w-50 place-items-center rounded-md bg-ground text-ink-soft dark:bg-night-surface dark:text-night-ink-soft">
              <Music className="size-8" />
            </div>
          )}
        </DialogTrigger>

        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-bold">
              {song.title}
            </DialogTitle>

            {song.singerOrComposer && (
              <p className="text-soft">
                {song.singerOrComposer}
              </p>
            )}
          </DialogHeader>

          {song.image && (
            <img
              src={song.image}
              alt={song.title}
              className="mx-auto max-h-80 rounded-xl object-contain shadow-sm"
            />
          )}

          <p className="text-soft">
            {song.moods.map((mood) => mood.name).join(", ")}
          </p>
        </DialogContent>
      </Dialog>

      <div>
        <p className="font-display text-xl font-bold text-ink dark:text-night-ink">
          {song.title}
        </p>

        {song.singerOrComposer && (
          <p className="text-soft">
            {song.singerOrComposer}
          </p>
        )}
      </div>
    </div>
  );
}

export default SongCard;
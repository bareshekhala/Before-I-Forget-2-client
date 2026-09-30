import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import SongEdit from "./SongEdit";
import SongCreate from "./SongCreate";
import { Music } from "lucide-react";
import DeleteAlart from "../forAll/DeleteAlart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type FavSong = {
  id: string;
  title: string;
  singerOrComposer: string | null;
  image: string | null;
  url: string | null;
  moods: { id: string; name: string }[];
};

function FavSongs() {
  const [songs, setSongs] = useState<FavSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await service.get("/songs/favsongs");
      setSongs(response.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (favsongId: string) => {
    await service.delete(`/songs/favsongs/${favsongId}`);
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
  if (songs.length === 0) {
    return (
      <>
        <p className="text-soft">No songs in your archive yet.</p>
        <SongCreate onCreated={getData} />
      </>
    );
  }
  return (
    <>
      <SongCreate onCreated={getData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto justify-items-center gap-10 my-12 overflow-hidden">
        {songs.map((song) => {
          const embedUrl = song.url?.startsWith("https://open.spotify.com/track/")
            ? song.url.replace("open.spotify.com/track/", "open.spotify.com/embed/track/")
            : null;

          if (embedUrl) {
            return (
              <div
                key={song.id}
                className="grid w-85 gap-4 rounded-3xl bg-white p-4 shadow-sm dark:bg-night-surface"
              >
                <iframe
                  src={embedUrl}
                  className="h-88 w-full rounded-2xl"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
                <p className="text-soft">
                  {song.moods.map((mood) => mood.name).join(", ")}
                </p>
                <div className="flex gap-2">
                  <SongEdit favsongId={song.id} onUpdated={getData} />
                  <DeleteAlart onDelete={() => handleDelete(song.id)} />
                </div>
              </div>
            );
          }

          // without a link
          return (
            <div key={song.id} className="grid gap-4 rounded-3xl bg-white p-4 shadow-sm dark:bg-night-surface">
              <Dialog>
                <DialogTrigger className="shrink-0 cursor-pointer rounded-md">
                  {song.image ? (
                    <img
                      src={song.image}
                      loading="lazy"
                      className="size-20 rounded-md object-cover shadow-sm w-50 h-60 mx-auto"
                    />
                  ) : (
                    <span className="grid size-20 place-items-center rounded-md bg-ground text-ink-soft dark:bg-night-surface dark:text-night-ink-soft">
                      <Music className="size-6" />
                      <span className="sr-only">
                        Show details of {song.title}
                      </span>
                    </span>
                  )}
                </DialogTrigger>

                <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
                  <DialogHeader>
                    <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
                      {song.title}
                    </DialogTitle>
                    {song.singerOrComposer && (
                      <p className="text-soft">{song.singerOrComposer}</p>
                    )}
                  </DialogHeader>

                  {song.image && (
                    <img
                      src={song.image}
                      className="mx-auto max-h-80 rounded-xl object-contain shadow-sm"
                    />
                  )}

                  <p className="text-soft">
                    {song.moods.map((mood) => mood.name).join(", ")}
                  </p>
                </DialogContent>
              </Dialog>

              <div className="flex-1">
                <p className="font-display text-xl font-bold text-ink dark:text-night-ink">
                  {song.title}
                </p>
                {song.singerOrComposer && (
                  <p className="text-soft">{song.singerOrComposer}</p>
                )}
              </div>

              <SongEdit favsongId={song.id} onUpdated={getData} />
              <DeleteAlart onDelete={() => handleDelete(song.id)} />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default FavSongs;

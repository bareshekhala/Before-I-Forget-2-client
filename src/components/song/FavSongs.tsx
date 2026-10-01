import { useEffect, useState } from "react";
import service from "@/services/service.index";
import Loader from "../Loader";
import SongEdit from "./SongEdit";
import SongCreate from "./SongCreate";
import DeleteAlart from "../forAll/DeleteAlart";
import SongCard from "./SongCard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto justify-items-center gap-10 my-12">
        {songs.map((song) => (
          <div key={song.id} className="grid gap-3">
            <SongCard song={song} />

            <div className="flex gap-2">
              <SongEdit favsongId={song.id} onUpdated={getData} />

              <DeleteAlart onDelete={() => handleDelete(song.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default FavSongs;

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
      <div className="grid place-items-center py-24">
        <Loader />
      </div>
    );
  }
  if (songs.length === 0) {
    return (
      <div className="empty-box">
        <p>No songs in your archive yet.</p>
        <SongCreate onCreated={getData} />
      </div>
    );
  }
  return (
    <>
      <div className="mt-3 flex justify-end xl:absolute xl:top-0.5 xl:right-0 xl:mt-0">
        <SongCreate onCreated={getData} />
      </div>
      <div className="grid gap-x-5 gap-y-6.5 pt-5 sm:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
        {songs.map((song) => (
          <div key={song.id} className="grid w-full max-w-85 content-start gap-2">
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

import { Button } from "@/components/ui/button";
import { CircleAlert, LoaderCircle } from "lucide-react";
import Loader from "../Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import service from "@/services/service.index";
import MoodChecked from "../forAll/MoodChecked";
import showError from "../forAll/ShowError";
import React, { useState } from "react";
import { Label } from "../ui/label";
import axios from "axios";


type SongEditProps = {
  favsongId: string;
  onUpdated: () => void;
};

function SongEdit({ favsongId, onUpdated }: SongEditProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [singerOrComposer, setSingerOrComposer] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [moods, setMoods] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

const getData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await service.get(`/songs/favsongs/${favsongId}`);
      setTitle(response.data.title);
      setSingerOrComposer(response.data.singerOrComposer ?? "");
      setImage(response.data.image ?? "");
      setUrl(response.data.url ?? "");
      setMoods(response.data.moods.map((mood: { name: string }) => mood.name));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage(showError(error));
    }
  };
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) getData();
    setOpen(isOpen);
  };
  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    if (url && !url.startsWith("https://open.spotify.com/track/")) {
      setErrorMessage("Please paste a Spotify Link");
      return;
    }
    if ((!title && !url) || moods.length === 0) {
      setErrorMessage("Please write a title or paste a Spotify link, and choose at least one mood");
      return;
    }
    setBusy(true);

    try {
      let songTitle = title;
      let songImage = image;

        if (url && (!songTitle || !songImage)) {
        const response = await axios.get(
          `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);

        const info = response.data;

        songTitle = songTitle || info.title;
        songImage = songImage || info.thumbnail_url;
      }
      if (!songTitle) {
        setBusy(false);
        setErrorMessage("please write the title yourself");
        return;
      }

      const body = {
        title: songTitle,
        singerOrComposer: singerOrComposer || null,
        image: songImage,
        url,
        moods,
      };
      await service.patch(`/songs/favsongs/${favsongId}`, body);
      setBusy(false);
      setOpen(false);
      onUpdated();
    } catch (error) {
      console.log(error);
      setBusy(false);
      setErrorMessage(showError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline">Edit</Button>} />

      <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
            Edit song
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="grid place-items-center py-16">
            <Loader size={64} />
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="edit-song-url" className="field-label">
                Spotify link
              </Label>
              <Input
                id="edit-song-url"
                type="url"
                placeholder="https://open.spotify.com/track/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-song-title" className="field-label">
                Title
              </Label>
              <Input
                id="edit-song-title"
                type="text"
                placeholder="Taken from Spotify if you leave it empty"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-song-singer" className="field-label">
                Singer or composer (optional)
              </Label>
              <Input
                id="edit-song-singer"
                type="text"
                value={singerOrComposer}
                onChange={(e) => setSingerOrComposer(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-song-image" className="field-label">
                Cover image URL
              </Label>
              <Input
                id="edit-song-image"
                type="url"
                placeholder="Taken from Spotify if you leave it empty"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="field"
              />
            </div>

            <MoodChecked moodValue={moods} handleMood={setMoods} />

            {errorMessage && (
              <p role="alert" className="form-error">
                <CircleAlert className="mt-0.5 size-4 shrink-0" />
                {errorMessage}
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={busy}
                    className="h-12 w-full rounded-full text-base font-semibold text-ink dark:text-night-ink"
                  >
                    Cancel
                  </Button>
                }
              />
              <Button type="submit" disabled={busy} className="btn-primary">
                {busy && <LoaderCircle className="size-4.5 animate-spin" />}
                {busy ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SongEdit;

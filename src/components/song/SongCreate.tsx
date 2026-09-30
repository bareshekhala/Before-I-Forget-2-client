import { Button } from "@/components/ui/button";
import { CircleAlert, LoaderCircle, Plus } from "lucide-react";
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


type SongCreateProps = {
  onCreated: () => void;
};

function SongCreate({ onCreated }: SongCreateProps) {


  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [singerOrComposer, setSingerOrComposer] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [moods, setMoods] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    //the idea here is that the user can a spotify link -> and since the titel data must be filled -> we can get the titel and image directly from spotify url -> then we see the embeded spotify box in the page
    //and when there is no spotify link-> the user can fill the titel and other things herself

    if (url && !url.startsWith("https://open.spotify.com/track/")) {
      setErrorMessage("Please paste a Spotify song link");
      return;
    }
    if ((!title && !url) || moods.length === 0) {
      setErrorMessage(
        "Please write a title or paste a Spotify link, and choose at least one mood",
      );
      return;
    }
    setBusy(true);

    try {
      let songTitle = title;
      let songImage = image;

      // a Spotify link but no title or cover -> we ask Spotify for them
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
      await service.post("/songs/favsongs", body);
      setTitle("");
      setSingerOrComposer("");
      setImage("");
      setUrl("");
      setMoods([]);
      onCreated();
      setBusy(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
      setErrorMessage(showError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="btn-primary w-auto! gap-2">
            <Plus className="size-5" />
            Add a song
          </Button>
        }
      />

      <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
            Add a song
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="create-song-url" className="field-label">
              Spotify link
            </Label>
            <Input
              id="create-song-url"
              type="url"
              placeholder="https://open.spotify.com/track/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="field"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="create-song-title" className="field-label">
              Title
            </Label>
            <Input
              id="create-song-title"
              type="text"
              placeholder="Taken from Spotify if you leave it empty"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="create-song-singer" className="field-label">
              Singer or composer (optional)
            </Label>
            <Input
              id="create-song-singer"
              type="text"
              value={singerOrComposer}
              onChange={(e) => setSingerOrComposer(e.target.value)}
              className="field"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="create-song-image" className="field-label">
              Cover image URL
            </Label>
            <Input
              id="create-song-image"
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
              {busy ? "Adding..." : "Add to my archive"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SongCreate;

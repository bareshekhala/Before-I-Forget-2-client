import { Button } from "@/components/ui/button";
import { CircleAlert, LoaderCircle, Pencil } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import service from "@/services/service.index";
import MoodChecked from "../forAll/MoodChecked";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { categories } from "./Categories";

type MovieEditProps = {
favmovieId: string;
onUpdated: () => void;
};

function MovieEdit({ favmovieId, onUpdated }: MovieEditProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [overview, setOverview] = useState("");
  const [moods, setMoods] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const getData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await service.get(`/movies/favmovies/${favmovieId}`);
      setTitle(response.data.title);
      setCategory(response.data.category);
      setPoster_path(response.data.poster_path ?? "");
      setOverview(response.data.overview ?? "");
      setMoods(response.data.moods.map((mood: { name: string }) => mood.name));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage("Could not load this book, please try again.");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) getData();
    setOpen(isOpen);
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!title || !category || moods.length === 0) {
      setErrorMessage("Please Fill out the Titel and Choose at least one Mood");
      return;
    }
    setBusy(true);
    const body = {
      title,
      poster_path,
      category,
      overview,
      moods,
    };
    try {
      await service.patch(`/movies/favmovies/${favmovieId}`, body);
      setBusy(false);
      setOpen(false);
      onUpdated();
    } catch (error) {
      console.log(error);
      setBusy(false);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" className="btn-card">
            <Pencil />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
            Edit Movie
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="grid place-items-center py-16">
            <Loader size={64} />
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="edit-title" className="field-label">
                Title
              </Label>
              <Input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-category" className="field-label">
                Category
              </Label>
              <Select
                items={categories}
                value={category}
                onValueChange={(value) => setCategory(value ?? "")}
              >
                <SelectTrigger id="edit-category" className="field w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((each) => (
                      <SelectItem key={each.value} value={each.value}>
                        {each.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-image" className="field-label">
                Poster URL
              </Label>
              <Input
                id="edit-image"
                type="url"
                placeholder="https://"
                value={poster_path}
                onChange={(e) => setPoster_path(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description" className="field-label">
                Overview
              </Label>
              <Textarea
                id="edit-description"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="field h-auto! min-h-28 py-3"
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

export default MovieEdit;

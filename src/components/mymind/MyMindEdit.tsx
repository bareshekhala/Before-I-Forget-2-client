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
import { Textarea } from "@/components/ui/textarea";
import service from "@/services/service.index";
import MoodChecked from "../forAll/MoodChecked";
import showError from "../forAll/ShowError";
import React, { useState } from "react";
import { Label } from "../ui/label";

type MyMindEditProps = {
  mymindId: string;
  name: string;
  onUpdated: () => void;
};

function MyMindEdit({ mymindId, name, onUpdated }: MyMindEditProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [moods, setMoods] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await service.get(`/mymind/${mymindId}`);
      setTitle(response.data.title);
      setDescription(response.data.description ?? "");
      setImage(response.data.image ?? "");
      setUrl(response.data.url ?? "");
      setDate(response.data.date ? response.data.date.slice(0, 10) : "");
      setCategory(response.data.category);
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
    if (!title || moods.length === 0) {
      setErrorMessage("Please fill out the title and choose at least one mood");
      return;
    }
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      setErrorMessage("The link has to start with http:// or https://");
      return;
    }
    setBusy(true);
    const body = {
      title,
      description,
      image,
      url,
      date,
      category,
      moods,
    };
    try {
      await service.patch(`/mymind/${mymindId}`, body);
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
            Edit {name}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="grid place-items-center py-16">
            <Loader size={64} />
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="edit-mymind-title" className="field-label">
                Title
              </Label>
              <Input
                id="edit-mymind-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="field"
              />
            </div>

            {category === "WEBSITE" && (
              <div className="grid gap-2">
                <Label htmlFor="edit-mymind-url" className="field-label">
                  Link
                </Label>
                <Input
                  id="edit-mymind-url"
                  type="url"
                  placeholder="https://"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="field"
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="edit-mymind-date" className="field-label">
                Date
              </Label>
              <Input
                id="edit-mymind-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-mymind-image" className="field-label">
                Image URL
              </Label>
              <Input
                id="edit-mymind-image"
                type="url"
                placeholder="https://"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-mymind-description" className="field-label">
                Description
              </Label>
              <Textarea
                id="edit-mymind-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default MyMindEdit;

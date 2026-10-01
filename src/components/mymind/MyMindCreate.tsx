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
import { Textarea } from "@/components/ui/textarea";
import service from "@/services/service.index";
import MoodChecked from "../forAll/MoodChecked";
import showError from "../forAll/ShowError";
import React, { useState } from "react";
import { Label } from "../ui/label";
import Loader from "../Loader";

type MyMindCreateProps = {
  category: string;
  name: string;
  onCreated: () => void;
};

function MyMindCreate({ category, name, onCreated }: MyMindCreateProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [moods, setMoods] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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
      await service.post("/mymind", body);
      setTitle("");
      setDescription("");
      setImage("");
      setUrl("");
      setDate("");
      setMoods([]);
      onCreated();
      setBusy(false);
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
      setErrorMessage(showError(error));
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="btn-primary w-auto! gap-2">
            <Plus className="size-5" />
            Add a {name}
          </Button>
        }
      />

      <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
            Add a {name}
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="grid place-items-center py-16">
            <Loader size={64} />
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="create-mymind-title" className="field-label">
                Title
              </Label>
              <Input
                id="create-mymind-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="field"
              />
            </div>

            {category === "WEBSITE" && (
              <div className="grid gap-2">
                <Label htmlFor="create-mymind-url" className="field-label">
                  Link
                </Label>
                <Input
                  id="create-mymind-url"
                  type="url"
                  placeholder="https://"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="field"
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="create-mymind-date" className="field-label">
                Date
              </Label>
              <Input
                id="create-mymind-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="create-mymind-image" className="field-label">
                Image URL
              </Label>
              <Input
                id="create-mymind-image"
                type="url"
                placeholder="https://"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="create-mymind-description" className="field-label">
                Description
              </Label>
              <Textarea
                id="create-mymind-description"
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
                {busy ? "Adding..." : "Add to my archive"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default MyMindCreate;

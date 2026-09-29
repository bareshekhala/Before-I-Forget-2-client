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
import { categories } from "../forAll/Categories";
import Loader from "../Loader";

type BookCreateProps = {
  onCreated: () => void;
};

function BookCreate({ onCreated }: BookCreateProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [moods, setMoods] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!title || !category || moods.length === 0) {
      setErrorMessage(
        "Please fill out the title and category, and choose at least one mood",
      );
      return;
    }
    setBusy(true);
    setIsLoading(true);

    const body = {
      title,
      author,
      image,
      category,
      pageCount,
      description,
      moods,
    };
    try {
      await service.post("/books/favbooks", body);
      //with these we make the form empty agsin => when the user open the create form again, it will be empty -> otherwise it will be filled with the prev data
      setTitle("");
      setAuthor("");
      setCategory("");
      setImage("");
      setDescription("");
      setPageCount("");
      setMoods([]);
      onCreated();
      setBusy(false);
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
      setErrorMessage("Something went wrong, please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="btn-primary w-auto! gap-2">
            <Plus className="size-5" />
            Add a book
          </Button>
        }
      />

      <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-lg sm:p-8 dark:bg-night-surface dark:text-night-ink">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-bold tracking-tight text-ink dark:text-night-ink">
            Add a book
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="grid place-items-center py-16">
            <Loader size={64} />
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="create-title" className="field-label">
                Title
              </Label>
              <Input
                id="create-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="field"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
              <div className="grid gap-2">
                <Label htmlFor="create-author" className="field-label">
                  Author
                </Label>
                <Input
                  id="create-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="field"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="create-pages" className="field-label">
                  Pages
                </Label>
                <Input
                  id="create-pages"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  className="field"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="create-category" className="field-label">
                Category
              </Label>
              <Select
                items={categories}
                value={category}
                onValueChange={(value) => setCategory(value ?? "")}
              >
                <SelectTrigger id="create-category" className="field w-full">
                  <SelectValue placeholder="Choose a category" />
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
              <Label htmlFor="create-image" className="field-label">
                Image URL
              </Label>
              <Input
                id="create-image"
                type="url"
                placeholder="https://"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="field"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="create-description" className="field-label">
                Description
              </Label>
              <Textarea
                id="create-description"
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

export default BookCreate;

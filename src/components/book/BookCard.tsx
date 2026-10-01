import { BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type BookCardBook = {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  image: string | null;
  category: string;
  pageCount?: number | null;
  moods: { id: string; name: string }[];
};

type BookCardProps = {
  book: BookCardBook;
};

function BookCard({ book }: BookCardProps) {
  return (
    <div className="glass flex w-full max-w-sm items-center gap-4 rounded-2xl p-4">
      <Dialog>
        <DialogTrigger className="shrink-0 cursor-pointer rounded-md">
          {book.image ? (
            <img
              src={book.image}
              className="h-28 w-20 rounded-lg object-cover shadow-sm"
            />
          ) : (
            <div className="grid h-28 w-20 place-items-center rounded-lg bg-ground text-ink-soft dark:bg-night-surface">
              <BookOpen className="size-6" />
            </div>
          )}
        </DialogTrigger>

        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{book.title}</DialogTitle>

            {book.author && (
              <p className="text-soft">{book.author}</p>
            )}
          </DialogHeader>

          {book.image && (
            <img
              src={book.image}
              alt={book.title}
              className="mx-auto max-h-80 rounded-xl object-contain"
            />
          )}

          {book.description && (
            <DialogDescription className="text-base">
              {book.description}
            </DialogDescription>
          )}

          <p>Category: {book.category}</p>

          {book.pageCount && (
            <p>{book.pageCount} pages</p>
          )}

          <p className="text-soft">
            {book.moods.map((mood) => mood.name).join(", ")}
          </p>
        </DialogContent>
      </Dialog>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg font-bold">
          {book.title}
        </p>

        {book.author && (
          <p className="truncate text-sm text-soft">
            {book.author}
          </p>
        )}

        <p className="mt-1 text-xs text-soft">
          {book.category}
        </p>
      </div>
    </div>
  );
}

export default BookCard;
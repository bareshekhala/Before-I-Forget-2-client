import { BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

function BookCard({ book}: BookCardProps) {
  // when there is no cover
  const cover = book.image ? (
    <img src={book.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
  ) : (
    <BookOpen className="size-8" />
  );

  return (
      <Dialog>
        <DialogTrigger className="group grid w-full max-w-56 cursor-pointer content-start gap-2.5 rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">
          <span className="card-stage">{cover}</span>

          <span className="grid gap-0.5 px-0.5">
            <span className="text-soft text-[13px] font-semibold capitalize">
              {book.category}
            </span>
            <span className="text-[15px] leading-snug font-bold text-ink dark:text-night-ink">
              {book.title}
            </span>
            {book.author && (
              <span className="text-soft line-clamp-2 text-sm">
                {book.author}
              </span>
            )}

            <span className="mt-1.5 flex flex-wrap gap-1.5">
              {book.moods.slice(0, 2).map((mood) => (
                <span key={mood.id} className="mood-pill">
                  {mood.name}
                </span>
              ))}
              {book.moods.length > 2 && (
                <span className="mood-pill">+{book.moods.length - 2}</span>
              )}
            </span>
          </span>
        </DialogTrigger>

        <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-[min(48rem,calc(100%-2rem))] sm:p-7 dark:bg-night-surface dark:text-night-ink">
          <div className="grid gap-5 sm:grid-cols-[13.75rem_minmax(0,1fr)] sm:gap-7">
            <div className="card-stage max-w-45 sm:max-w-none">{cover}</div>

            <div className="grid content-start gap-2">
              <p className="text-soft flex items-center gap-1.5 text-sm font-semibold">
                <BookOpen className="size-4" />
                Book
              </p>
              <DialogTitle className="pr-8 font-display text-[2rem] leading-[1.05] font-[760] tracking-[-0.02em] text-balance">
                {book.title}
              </DialogTitle>
              {book.author && (
                <p className="text-soft text-[1.05rem]">{book.author}</p>
              )}

              <p className="text-soft flex flex-wrap gap-x-4.5 gap-y-1 text-[14.5px]">
                <span className="capitalize">Category: {book.category}</span>
                {book.pageCount && <span>{book.pageCount} pages</span>}
              </p>

              <p className="mt-0.5 flex flex-wrap gap-1.5">
                {book.moods.map((mood) => (
                  <span key={mood.id} className="mood-pill">
                    {mood.name}
                  </span>
                ))}
              </p>

              {book.description && (
                <DialogDescription className="mt-2 text-base leading-relaxed text-ink dark:text-night-ink">
                  {book.description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}

export default BookCard;

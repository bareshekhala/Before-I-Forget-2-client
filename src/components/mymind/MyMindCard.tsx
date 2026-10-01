import { Cloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type MyMindCardItem = {
  id: string;
  title: string;
  image: string | null;
  description: string | null;
  url: string | null;
  date: string | null;
  category: string;
  moods: { id: string; name: string }[];
};

type MyMindCardProps = {
  myMind: MyMindCardItem;
};

function MyMindCard({ myMind }: MyMindCardProps) {
  const cover = myMind.image ? (
    <img src={myMind.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
  ) : (
    <Cloud className="size-8" />
  );

  const date = myMind.date
    ? new Date(myMind.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Dialog>
      <DialogTrigger className="group grid w-full max-w-56 cursor-pointer content-start gap-2.5 rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">
        <span className="card-stage">{cover}</span>

        <span className="grid gap-0.5 px-0.5">
          {date && (
            <span className="text-soft text-[13px] font-semibold">{date}</span>
          )}
          <span className="text-[15px] leading-snug font-bold text-ink dark:text-night-ink">
            {myMind.title}
          </span>
          {myMind.description && (
            <span className="text-soft line-clamp-2 text-sm">
              {myMind.description}
            </span>
          )}

          <span className="mt-1.5 flex flex-wrap gap-1.5">
            {myMind.moods.slice(0, 2).map((mood) => (
              <span key={mood.id} className="mood-pill">
                {mood.name}
              </span>
            ))}
            {myMind.moods.length > 2 && (
              <span className="mood-pill">+{myMind.moods.length - 2}</span>
            )}
          </span>
        </span>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-3xl bg-white p-6 text-ink sm:max-w-[min(48rem,calc(100%-2rem))] sm:p-7 dark:bg-night-surface dark:text-night-ink">
        <div className="grid gap-5 sm:grid-cols-[13.75rem_minmax(0,1fr)] sm:gap-7">
          <div className="card-stage max-w-45 sm:max-w-none">{cover}</div>

          <div className="grid content-start gap-2">
            <p className="text-soft flex items-center gap-1.5 text-sm font-semibold capitalize">
              <Cloud className="size-4" />
              {myMind.category.toLowerCase()}
            </p>
            <DialogTitle className="pr-8 font-display text-[2rem] leading-[1.05] font-[760] tracking-[-0.02em] text-balance">
              {myMind.title}
            </DialogTitle>
            {date && <p className="text-soft text-[14.5px]">{date}</p>}

            {myMind.url?.startsWith("http") && (
              <a
                href={myMind.url}
                target="_blank"
                rel="noreferrer"
                className="text-link break-all"
              >
                {myMind.url}
              </a>
            )}

            <p className="mt-0.5 flex flex-wrap gap-1.5">
              {myMind.moods.map((mood) => (
                <span key={mood.id} className="mood-pill">
                  {mood.name}
                </span>
              ))}
            </p>

            {myMind.description && (
              <DialogDescription className="mt-2 text-base leading-relaxed whitespace-pre-line text-ink dark:text-night-ink">
                {myMind.description}
              </DialogDescription>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MyMindCard;

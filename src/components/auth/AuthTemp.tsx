import type { ReactNode } from "react";
import day from "../../assets/day.png"
import night from "../../assets/night.png";

type AuthTempProps = {
  quote: string;
  sub: string;
  children: ReactNode;
};

function AuthTemp({ quote, sub, children }: AuthTempProps) {
  return (
    <div className="grid min-h-svh p-2 sm:p-4">
      <div className="relative isolate mx-auto grid w-full max-w-7xl content-center gap-6 overflow-hidden rounded-3xl p-4 sm:p-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:p-12">
        <div className="absolute inset-0 -z-10">
          <img src={day} className="absolute inset-0 size-full object-cover object-bottom" />
          <img
            src={night}
            className="absolute inset-0 size-full object-cover object-bottom opacity-0 transition-opacity duration-1000 dark:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-b from-ground/70 to-transparent lg:bg-linear-to-r dark:from-night/70" />
        </div>

        <div className="grid gap-4 px-2 text-ink lg:self-start lg:pt-12 dark:text-night-ink">
          <p className="font-display text-4xl leading-none font-bold tracking-tight text-balance lg:text-6xl">
            {quote}
          </p>
          <p className="hidden max-w-md text-lg lg:block">{sub}</p>
        </div>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">{children}</div>
      </div>
    </div>
  );
}

export default AuthTemp;
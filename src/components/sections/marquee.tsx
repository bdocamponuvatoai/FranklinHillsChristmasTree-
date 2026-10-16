import { marqueeItems } from "@/content/site";

import { Asterisk } from "../ui/icons";

function MarqueeTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          <span className="font-display text-2xl tracking-[-0.03em] whitespace-nowrap italic sm:text-4xl">
            {item}
          </span>
          <Asterisk className="text-lg text-berry sm:text-2xl" />
        </li>
      ))}
    </ul>
  );
}

/** Endless ribbon of seasonal phrases. Pauses on hover; static for reduced motion. */
export function Marquee() {
  return (
    <div className="group overflow-hidden border-b border-line py-6 sm:py-9">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeTrack />
        <MarqueeTrack hidden />
      </div>
    </div>
  );
}

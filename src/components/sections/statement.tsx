import { business } from "@/content/site";

import { Eyebrow } from "../ui/eyebrow";
import { TextLink } from "../ui/text-link";

const lead = "Somewhere between the fresh branches and your favorite ornaments,";
const accent = "a house starts to feel like the holidays.";

function InkWords({ text, className }: { text: string; className?: string }) {
  return text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`} className={`ink-word ${className ?? ""}`}>
      {word}{" "}
    </span>
  ));
}

/** Oversized statement whose words fill with ink as they scroll into view. */
export function Statement() {
  return (
    <section
      aria-labelledby="statement-title"
      className="shell border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <Eyebrow className="mb-8 text-moss sm:mb-10">The season, rooted in something real</Eyebrow>
      <h2 id="statement-title" className="max-w-[24ch] font-display text-statement">
        <InkWords text={lead} /> <InkWords text={accent} className="text-berry italic" />
      </h2>

      <div className="reveal mt-12 grid gap-8 sm:mt-16 md:grid-cols-12">
        <p className="font-display text-2xl leading-snug tracking-[-0.02em] md:col-span-5 md:col-start-6">
          Not just a tree. <em>Your Christmas tree.</em>
        </p>
        <div className="md:col-span-4 md:col-start-6">
          <p className="text-[0.9375rem] leading-relaxed text-moss">
            Find fresh Christmas trees and holiday decorations at {business.name}. Start with a
            tree. Make the rest your own.
          </p>
          <TextLink href={business.phone.href} className="mt-4 text-pine">
            Ask about this season’s selection
          </TextLink>
        </div>
      </div>
    </section>
  );
}

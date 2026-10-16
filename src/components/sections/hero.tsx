import Image from "next/image";
import type { CSSProperties } from "react";

import { business, images } from "@/content/site";

import { ButtonLink } from "../ui/button-link";
import { ArrowDown, Phone } from "../ui/icons";

const headline = [
  { text: "Come for a tree.", className: "" },
  { text: "Leave with Christmas.", className: "italic text-frost" },
];

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="px-2 pt-2 sm:px-4 sm:pt-4">
      <div className="relative isolate flex h-[calc(100svh-7.75rem)] max-h-[60rem] min-h-[38rem] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-pine-deep text-paper sm:rounded-[2rem] lg:h-[calc(100svh-8.5rem)]">
        <div className="hero-drift absolute inset-0 -z-20">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            preload
            quality={85}
            sizes="100vw"
            placeholder="blur"
            className="hero-media object-cover object-[52%_56%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_29_22/0.55)_0%,rgb(8_29_22/0.15)_38%,rgb(8_29_22/0.35)_62%,rgb(8_29_22/0.88)_100%)]"
        />
        {/* Warm festoon glow breathing over the treetops. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-1/2 animate-twinkle bg-[radial-gradient(60%_70%_at_60%_0%,rgb(246_220_162/0.22),transparent_70%)] [animation-duration:5s]"
        />

        <div className="shell flex items-center justify-between pt-5 sm:pt-7">
          <p
            className="enter inline-flex items-center gap-2.5 rounded-full border border-paper/20 bg-paper/10 px-4 py-2 text-[0.6875rem] tracking-[0.04em] backdrop-blur-md"
            style={{ "--i": 0 } as CSSProperties}
          >
            <span aria-hidden="true" className="size-1.5 animate-beacon rounded-full bg-glow" />
            Season details by phone
          </p>
          <p
            className="enter hidden eyebrow text-paper/80 sm:block"
            style={{ "--i": 1 } as CSSProperties}
          >
            Fresh trees · Holiday décor
          </p>
        </div>

        <div className="shell pb-6 sm:pb-10 lg:pb-12">
          <p
            className="enter mb-5 eyebrow text-paper/80 sm:mb-7"
            style={{ "--i": 0 } as CSSProperties}
          >
            {business.shortName} · A season to remember
          </p>
          <h1 id="hero-title" className="font-display text-hero">
            {headline.map((line, index) => (
              <span key={line.text} className="line-mask">
                <span
                  className={`hero-line ${line.className}`}
                  style={{ "--i": index } as CSSProperties}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="enter mt-8 grid gap-6 border-t border-paper/25 pt-6 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end md:gap-10"
            style={{ "--i": 2 } as CSSProperties}
          >
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-paper/80">
              The scent. The lights. The one that feels just right. Your Christmas story starts
              here.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#moments" variant="ivory" icon={<ArrowDown />}>
                Step into the season
              </ButtonLink>
              <ButtonLink href={business.phone.href} variant="glass" icon={<Phone />}>
                Call {business.owner}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

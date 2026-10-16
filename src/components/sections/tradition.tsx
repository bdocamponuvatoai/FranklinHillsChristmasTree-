import Image from "next/image";

import { images } from "@/content/site";

import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { Asterisk } from "../ui/icons";

export function Tradition() {
  return (
    <section
      id="tradition"
      aria-labelledby="tradition-title"
      className="shell grid items-center gap-12 pb-20 sm:pb-28 lg:grid-cols-12 lg:gap-8 lg:pb-36"
    >
      <figure className="lg:col-span-5">
        <div className="unveil relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sage sm:rounded-[1.5rem]">
          <Image
            src={images.home.src}
            alt={images.home.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            placeholder="blur"
            className="parallax object-cover"
          />
        </div>
        <figcaption className="mt-4 flex justify-between eyebrow text-moss">
          <span>01 · The feeling of coming home</span>
          <span aria-hidden="true">✳</span>
        </figcaption>
      </figure>

      <div className="reveal lg:col-span-6 lg:col-start-7">
        <Eyebrow className="mb-6 text-moss">Make space for a little wonder</Eyebrow>
        <h2 id="tradition-title" className="font-display text-display">
          Real branches. Little rituals. <em className="text-berry">Lasting memories.</em>
        </h2>
        <div className="mt-8 max-w-md space-y-4 text-[0.9375rem] leading-relaxed text-moss">
          <p>
            The ornament you’ve had forever. The one the kids made. The quiet moment when all the
            lights come on.
          </p>
          <p>
            A real tree becomes the backdrop to it all. Whether it’s your first Christmas in a new
            place or a tradition you return to, make this year feel like yours.
          </p>
        </div>
        <ButtonLink href="#planner" className="mt-9">
          Find your fit
        </ButtonLink>

        <blockquote className="mt-12 flex items-center gap-5 border-t border-line pt-8">
          <Asterisk className="shrink-0 text-4xl text-berry" />
          <p className="font-display text-xl leading-snug tracking-[-0.02em] italic sm:text-2xl">
            A beautiful Christmas begins with the simplest things.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

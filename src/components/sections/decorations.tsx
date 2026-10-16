import Image from "next/image";

import { business, images } from "@/content/site";

import { Eyebrow } from "../ui/eyebrow";
import { TextLink } from "../ui/text-link";

export function Decorations() {
  return (
    <section aria-labelledby="decorations-title" className="px-2 sm:px-4">
      <div className="grid overflow-hidden rounded-[1.25rem] bg-sage sm:rounded-[2rem] lg:grid-cols-12">
        <div className="reveal flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:col-span-5 lg:px-16">
          <Eyebrow className="mb-6 text-moss">The finishing touches</Eyebrow>
          <h2 id="decorations-title" className="font-display text-display">
            A little festive. <em className="text-berry">Everywhere.</em>
          </h2>
          <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-moss">
            From the tree to the corners that make your home yours, holiday decorations bring the
            whole season together.
          </p>
          <TextLink href={business.phone.href} className="mt-5 self-start text-pine">
            Ask what’s available
          </TextLink>
          <p className="mt-8 text-xs text-moss">
            Holiday selection varies. Contact {business.owner} for current items.
          </p>
        </div>

        <div className="p-2 pt-0 sm:p-3 sm:pt-0 lg:col-span-7 lg:pt-3 lg:pl-0">
          <div className="unveil relative aspect-[4/3] h-full overflow-hidden rounded-[1rem] sm:rounded-[1.5rem] lg:min-h-[36rem]">
            <Image
              src={images.detail.src}
              alt={images.detail.alt}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              placeholder="blur"
              className="parallax object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

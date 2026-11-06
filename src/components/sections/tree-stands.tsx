import Image from "next/image";

import { business, images, standProducts } from "@/content/site";
import { formatPrice } from "@/lib/pricing";

import { SampleTag } from "../pricing/sample-tag";
import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { Phone } from "../ui/icons";

export function TreeStands() {
  return (
    <section
      id="stands"
      aria-labelledby="stands-title"
      className="bg-pine py-20 text-paper sm:py-28 lg:py-36"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="reveal lg:col-span-7">
            <Eyebrow className="mb-6 text-frost">A steady start</Eyebrow>
            <h2 id="stands-title" className="font-display text-display">
              The right stand makes <em className="text-frost">all the difference.</em>
            </h2>
          </div>
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-paper/70 lg:col-span-4 lg:col-start-9">
            Three ways to hold your tree steady and watered. Each stand is rated for a maximum tree
            height, so pick the one that fits.
          </p>
        </div>

        {/* Grid items with an aspect ratio are not stretched: without grid-cols-1 and w-full, the
            image box sizes itself to 427px on phones (min-h-80 at 4:3) and overflows. */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden border border-paper/15 lg:mt-16 lg:grid-cols-12">
          <div className="relative aspect-[4/3] min-h-80 w-full overflow-hidden bg-pine-deep lg:col-span-7 lg:aspect-auto lg:min-h-[42rem]">
            <Image
              src={images.stands.src}
              alt={images.stands.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <p className="absolute right-4 bottom-4 left-4 bg-pine-deep/85 px-4 py-3 text-xs leading-relaxed text-paper/75 backdrop-blur-md">
              Illustrative product styling, not photos of actual stock.
            </p>
          </div>

          <div className="divide-y divide-paper/15 lg:col-span-5">
            {standProducts.map((stand) => (
              <article key={stand.id} className="p-6 sm:p-8 lg:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.625rem] tracking-[0.16em] text-frost uppercase">
                      Stand style {stand.index}
                    </p>
                    <h3 className="mt-3 font-display text-3xl tracking-[-0.03em]">{stand.name}</h3>
                  </div>
                  <p className="shrink-0 pt-1 text-right font-display text-2xl tracking-[-0.02em] tabular-nums">
                    {formatPrice(stand.price)}
                    <span className="mt-1 block font-sans text-base">
                      <SampleTag />
                    </span>
                  </p>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/65">
                  {stand.description}
                </p>
                <dl className="mt-5 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <dt className="text-paper/65">Fits trees</dt>
                    <dd className="mt-1">Up to {stand.maxTreeHeight} ft</dd>
                  </div>
                  <div>
                    <dt className="text-paper/65">Water</dt>
                    <dd className="mt-1">Holds {stand.water}</dd>
                  </div>
                  <div>
                    <dt className="text-paper/65">Stock</dt>
                    <dd className="mt-1">{stand.availability}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-paper/65">
            Not sure which stand fits? The price estimator flags a stand that’s too small for your
            tree, or {business.owner} can help by phone.
          </p>
          <ButtonLink href={business.phone.href} variant="ivory" icon={<Phone />}>
            Ask about stands
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { galleryImages, imageDisclaimer } from "@/content/site";

import { Eyebrow } from "../ui/eyebrow";
import { ArrowUpRight, Close } from "../ui/icons";

/**
 * Grid placement and matching `sizes` hint for each tile, in gallery order.
 * Phones get two columns, with the first and last tiles spanning both.
 */
const tiles = [
  {
    className: "col-span-2 lg:col-span-7 lg:row-span-2",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  { className: "lg:col-span-5", sizes: "(min-width: 1024px) 42vw, 50vw" },
  { className: "lg:col-span-5", sizes: "(min-width: 1024px) 42vw, 50vw" },
  { className: "lg:col-span-4", sizes: "(min-width: 1024px) 33vw, 50vw" },
  { className: "lg:col-span-4", sizes: "(min-width: 1024px) 33vw, 50vw" },
  { className: "col-span-2 lg:col-span-4", sizes: "(min-width: 1024px) 33vw, 100vw" },
];

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const selected = galleryImages[active];

  const open = (index: number) => {
    setActive(index);
    dialogRef.current?.showModal();
  };

  const move = (direction: -1 | 1) => {
    setActive((current) => (current + direction + galleryImages.length) % galleryImages.length);
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="bg-sage py-20 sm:py-28 lg:py-36"
    >
      <div className="shell">
        <div className="reveal grid gap-7 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="mb-6 text-moss">A glimpse of the season</Eyebrow>
            <h2 id="gallery-title" className="font-display text-display">
              Fresh greens. Warm lights. <em className="text-berry">Little rituals.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-moss md:col-span-4 md:justify-self-end">
            Explore the atmosphere, products, and journey home. Select any image for a closer look.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:mt-16 sm:gap-3 lg:grid-cols-12">
          {galleryImages.map((item, index) => {
            const tile = tiles[index % tiles.length];
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => open(index)}
                aria-label={`Open image: ${item.title}`}
                className={`group relative min-h-52 overflow-hidden bg-pine text-left sm:min-h-72 ${tile.className}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={tile.sizes}
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-pine-deep/85 via-pine-deep/25 to-transparent"
                />
                <span className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-4 text-paper sm:right-4 sm:bottom-4 sm:left-4">
                  <span className="min-w-0">
                    <span className="block text-[0.625rem] tracking-[0.14em] text-frost uppercase">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-display text-lg leading-tight tracking-[-0.02em] sm:text-xl">
                      {item.title}
                    </span>
                  </span>
                  {/* Half-width phone tiles are too narrow for the chip beside the title. */}
                  <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-paper text-pine transition-transform duration-500 ease-spring group-hover:rotate-45 sm:grid">
                    <ArrowUpRight />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-5 max-w-2xl text-xs leading-relaxed text-moss">{imageDisclaimer}</p>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Seasonal gallery image"
        className="m-auto h-[min(92dvh,56rem)] w-[min(94vw,78rem)] max-w-none overflow-hidden bg-pine-deep p-0 text-paper backdrop:bg-pine-deep/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative grid h-full grid-rows-[minmax(0,1fr)_auto]">
          <div className="relative min-h-0 bg-pine-deep">
            <Image
              key={selected.title}
              src={selected.src}
              alt={selected.alt}
              fill
              sizes="94vw"
              placeholder="blur"
              className="object-cover sm:object-contain"
            />
          </div>
          <div className="flex items-end justify-between gap-5 bg-pine-deep px-5 py-5 sm:px-8 sm:py-7">
            <div>
              <p className="text-[0.625rem] tracking-[0.14em] text-frost uppercase">
                {selected.category} · {active + 1} of {galleryImages.length}
              </p>
              <p className="mt-2 font-display text-2xl sm:text-3xl">{selected.title}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                className="grid min-h-11 min-w-11 place-items-center border border-paper/30 px-3 text-sm"
              >
                <span aria-hidden="true">←</span>
                <span className="sr-only">Previous image</span>
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="grid min-h-11 min-w-11 place-items-center border border-paper/30 px-3 text-sm"
              >
                <span aria-hidden="true">→</span>
                <span className="sr-only">Next image</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-paper text-xl text-pine shadow-lg"
          >
            <Close />
            <span className="sr-only">Close gallery</span>
          </button>
        </div>
      </dialog>
    </section>
  );
}

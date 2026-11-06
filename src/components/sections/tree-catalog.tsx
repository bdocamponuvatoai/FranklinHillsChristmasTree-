"use client";

import Image from "next/image";
import { useState } from "react";

import {
  business,
  isSampleCatalog,
  pricing,
  sizeBands,
  treeProducts,
  type TreeProduct,
} from "@/content/site";
import { formatHeightRange, rangesOverlap } from "@/lib/catalog";
import { formatPrice, treePrice } from "@/lib/pricing";

import { SampleNotice, SampleTag } from "../pricing/sample-tag";
import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { Phone } from "../ui/icons";
import { TextLink } from "../ui/text-link";
import { InquiryButton } from "./inquiry-form";

type FilterName = "variety" | "size" | "price";

type Filter = {
  label: string;
  all: string;
  options: readonly { value: string; label: string }[];
  matches: (product: TreeProduct, value: string) => boolean;
};

// Every option is built from the catalog itself, so filters can't drift from the cards.
const filters: Record<FilterName, Filter> = {
  variety: {
    label: "Variety",
    all: "All varieties",
    options: treeProducts.map((product) => ({ value: product.id, label: product.name })),
    matches: (product, value) => product.id === value,
  },
  size: {
    label: "Height",
    all: "All heights",
    options: sizeBands,
    matches: (product, value) => {
      const band = sizeBands.find((option) => option.value === value);
      return band !== undefined && rangesOverlap(product.sizes, band);
    },
  },
  price: {
    label: "Price",
    all: "All prices",
    options: [...new Set(treeProducts.map((product) => product.ratePerFoot))]
      .sort((a, b) => a - b)
      .map((rate) => ({ value: String(rate), label: `${formatPrice(rate)} per ft` })),
    matches: (product, value) => String(product.ratePerFoot) === value,
  },
};

const filterNames = Object.keys(filters) as FilterName[];

const initialSelection: Record<FilterName, string> = { variety: "all", size: "all", price: "all" };

export function TreeCatalog() {
  const [selection, setSelection] = useState(initialSelection);
  const visibleProducts = treeProducts.filter((product) =>
    filterNames.every(
      (name) => selection[name] === "all" || filters[name].matches(product, selection[name]),
    ),
  );
  const isFiltered = filterNames.some((name) => selection[name] !== "all");

  return (
    <section id="trees" aria-labelledby="trees-title" className="shell py-20 sm:py-28 lg:py-36">
      <div className="reveal grid gap-7 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Eyebrow className="mb-6 text-moss">This season’s tree collection</Eyebrow>
          <h2 id="trees-title" className="font-display text-display">
            Find the tree that <em className="text-berry">feels like yours.</em>
          </h2>
        </div>
        <div className="md:col-span-4 md:justify-self-end">
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-moss">
            Three fresh-cut favorites, each in its own range of heights. Compare them here, then
            call for today’s selection.
          </p>
          <TextLink href="#pricing" className="mt-2 text-pine">
            See how pricing works
          </TextLink>
        </div>
      </div>

      <div className="mt-10 sm:mt-12">
        <SampleNotice title="Sample catalog for owner review.">
          Varieties, heights, stock and prices show how the catalog will work. {business.owner}{" "}
          confirms this season’s real selection.
        </SampleNotice>
      </div>

      <div className="mt-8 border-y border-line py-5">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          {filterNames.map((name) => (
            <label key={name} className="grid gap-2 text-xs font-medium text-moss">
              <span className="tracking-[0.14em] uppercase">{filters[name].label}</span>
              <select
                value={selection[name]}
                onChange={(event) =>
                  setSelection((current) => ({ ...current, [name]: event.target.value }))
                }
                className="min-h-12 w-full border border-line bg-paper px-4 text-sm text-ink transition-colors outline-none focus:border-pine"
              >
                <option value="all">{filters[name].all}</option>
                {filters[name].options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <button
            type="button"
            onClick={() => setSelection(initialSelection)}
            disabled={!isFiltered}
            className="min-h-12 px-4 text-sm font-medium text-pine underline decoration-line underline-offset-4 transition-colors hover:text-berry disabled:text-moss disabled:no-underline"
          >
            Reset filters
          </button>
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-xs text-moss">
        Showing {visibleProducts.length} of {treeProducts.length} trees. Photos are illustrative.
      </p>

      {visibleProducts.length > 0 ? (
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden border border-line bg-paper transition-colors hover:border-sage-deep"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-sage">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  sizes="(min-width: 1024px) 31vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
                />
                <span className="absolute top-4 left-4 bg-paper px-3 py-2 text-[0.625rem] font-medium tracking-[0.14em] text-pine uppercase">
                  {product.badge}
                </span>
                <span className="absolute right-4 bottom-4 rounded-full bg-pine px-3 py-1.5 text-xs text-paper tabular-nums">
                  {formatHeightRange(product.sizes)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-xs tracking-[0.08em] text-berry uppercase">
                  {product.shape} · {product.profile}
                </p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl tracking-[-0.03em]">{product.name}</h3>
                  <p className="shrink-0 text-right">
                    <span className="block text-[0.625rem] tracking-[0.14em] text-moss uppercase">
                      From
                    </span>
                    <span className="font-display text-2xl tracking-[-0.02em] tabular-nums">
                      {formatPrice(
                        treePrice(product.sizes.min, product.ratePerFoot, pricing.roundTo),
                      )}
                    </span>
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-moss">{product.description}</p>
                <ul aria-label="Highlights" className="mt-5 flex flex-wrap gap-2">
                  {product.traits.map((trait) => (
                    <li key={trait} className="border border-line px-3 py-1.5 text-xs">
                      {trait}
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                  <div className="grid grid-cols-2 gap-4 py-3">
                    <dt className="text-moss">Heights</dt>
                    <dd className="text-right font-medium">{formatHeightRange(product.sizes)}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-3">
                    <dt className="text-moss">Price</dt>
                    <dd className="text-right font-medium">
                      {formatPrice(product.ratePerFoot)} per ft
                      <SampleTag />
                    </dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-3">
                    <dt className="text-moss">Availability</dt>
                    <dd className="text-right font-medium">
                      {product.availability}
                      <SampleTag />
                    </dd>
                  </div>
                </dl>
                {/* mt-auto lines the buttons up across cards of different heights. */}
                <div className="mt-auto pt-6">
                  <InquiryButton interest={product.name} variant="berry" className="w-full">
                    Ask about this tree
                  </InquiryButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-line bg-sage p-8 text-center">
          <p className="font-display text-2xl">No trees match those filters.</p>
          <button
            type="button"
            onClick={() => setSelection(initialSelection)}
            className="mt-4 min-h-11 text-sm font-medium underline underline-offset-4"
          >
            Show all trees
          </button>
        </div>
      )}

      <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-line pt-7 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-sm leading-relaxed text-moss">
          Stock changes daily{isSampleCatalog ? ", and these are sample listings" : ""}. For what is
          on the lot today, call {business.owner}.
        </p>
        <ButtonLink href={business.phone.href} icon={<Phone />}>
          Call for today’s selection
        </ButtonLink>
      </div>
    </section>
  );
}

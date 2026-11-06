"use client";

import Image from "next/image";
import { useState } from "react";

import { business, pricing, treeFilters, treeProducts, type TreeProduct } from "@/content/site";
import { formatPrice } from "@/lib/pricing";

import { SampleTag } from "../pricing/sample-tag";
import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { Phone } from "../ui/icons";
import { TextLink } from "../ui/text-link";

type FilterName = "type" | "size" | "price";

const filterNames: readonly FilterName[] = ["type", "size", "price"];

// Price options are built from the trees' own rates, so they always match the cards.
const filterOptions: Record<FilterName, readonly { value: string; label: string }[]> = {
  ...treeFilters,
  price: [...new Set(treeProducts.map((product) => product.ratePerFoot))]
    .sort((a, b) => a - b)
    .map((rate) => ({
      value: String(rate),
      label: `${formatPrice(rate)} per ft${pricing.status === "sample" ? " (sample)" : ""}`,
    })),
};

const productValue = (product: TreeProduct, name: FilterName) =>
  name === "price" ? String(product.ratePerFoot) : product.filters[name];

const initialFilters: Record<FilterName, string> = {
  type: "all",
  size: "all",
  price: "all",
};

export function TreeCatalog() {
  const [filters, setFilters] = useState(initialFilters);
  const filteredProducts = treeProducts.filter((product) =>
    filterNames.every(
      (key) => filters[key] === "all" || productValue(product, key) === filters[key],
    ),
  );

  const setFilter = (name: FilterName, value: string) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  return (
    <section id="trees" aria-labelledby="trees-title" className="shell py-20 sm:py-28 lg:py-36">
      <div className="reveal grid gap-7 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Eyebrow className="mb-6 text-moss">This season’s tree collection</Eyebrow>
          <h2 id="trees-title" className="font-display text-display">
            Find the shape that <em className="text-berry">feels like yours.</em>
          </h2>
        </div>
        <div className="md:col-span-4 md:justify-self-end">
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-moss">
            Browse the catalog framework below, then call for the current selection. Varieties,
            sizes, and stock are awaiting owner confirmation.
          </p>
          <TextLink href="#pricing" className="mt-2 text-pine">
            See how pricing works
          </TextLink>
        </div>
      </div>

      <div className="mt-12 border-y border-line py-5 sm:mt-16">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          {filterNames.map((name) => (
            <label key={name} className="grid gap-2 text-xs font-medium text-moss">
              <span className="tracking-[0.14em] uppercase">
                {name === "type" ? "Tree type" : name}
              </span>
              <select
                value={filters[name]}
                onChange={(event) => setFilter(name, event.target.value)}
                className="min-h-12 w-full border border-line bg-paper px-4 text-sm text-ink transition-colors outline-none focus:border-pine"
              >
                <option value="all">
                  All {name === "type" ? "types" : name === "size" ? "sizes" : "prices"}
                </option>
                {filterOptions[name].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="min-h-12 px-4 text-sm font-medium text-pine underline decoration-line underline-offset-4 transition-colors hover:text-berry"
          >
            Reset filters
          </button>
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-xs text-moss">
        Showing {filteredProducts.length} catalog placeholder
        {filteredProducts.length === 1 ? "" : "s"}. Product photography is illustrative.
      </p>

      {filteredProducts.length > 0 ? (
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <article
              key={product.id}
              className="group overflow-hidden border border-line bg-paper transition-colors hover:border-sage-deep"
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
                  Details pending
                </span>
                <span className="absolute right-4 bottom-4 grid size-10 place-items-center rounded-full bg-pine text-xs text-paper tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-xs tracking-[0.08em] text-berry uppercase">{product.profile}</p>
                <h3 className="mt-3 font-display text-3xl tracking-[-0.03em]">{product.name}</h3>
                <p className="mt-4 min-h-16 text-sm leading-relaxed text-moss">
                  {product.description}
                </p>
                <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                  {[
                    { label: "Variety", value: product.variety },
                    { label: "Available sizes", value: product.sizes },
                    {
                      label: "Price",
                      value: (
                        <>
                          {formatPrice(product.ratePerFoot)} per ft
                          <SampleTag />
                        </>
                      ),
                    },
                    { label: "Availability", value: product.availability },
                  ].map(({ label, value }) => (
                    <div key={label} className="grid grid-cols-2 gap-4 py-3">
                      <dt className="text-moss">{label}</dt>
                      <dd className="text-right font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <ButtonLink href="#inquiry" variant="berry" className="mt-6 w-full">
                  Ask about this tree
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-line bg-sage p-8 text-center">
          <p className="font-display text-2xl">No confirmed products match those filters yet.</p>
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="mt-4 min-h-11 text-sm font-medium underline underline-offset-4"
          >
            Show all placeholders
          </button>
        </div>
      )}

      <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-line pt-7 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-sm leading-relaxed text-moss">
          Nothing here represents confirmed inventory. For what is on the lot today, speak directly
          with {business.owner}.
        </p>
        <ButtonLink href={business.phone.href} icon={<Phone />}>
          Call for today’s selection
        </ButtonLink>
      </div>
    </section>
  );
}

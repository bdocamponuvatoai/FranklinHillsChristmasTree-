import { business, pricing, standProducts, treeProducts } from "@/content/site";
import { rangesOverlap } from "@/lib/catalog";
import { formatPrice, treePrice } from "@/lib/pricing";

import { PriceEstimator } from "../pricing/price-estimator";
import { SampleNotice, SampleTag } from "../pricing/sample-tag";
import { Eyebrow } from "../ui/eyebrow";

const { delivery, heights, roundTo } = pricing;

const priceHeights = Array.from(
  { length: Math.floor((heights.max - heights.min) / heights.step) + 1 },
  (_, index) => heights.min + index * heights.step,
);

// Built from the same numbers the estimator uses, so the rules and prices can't disagree.
const rules = [
  {
    title: "Trees are priced by height",
    body: `Each variety has a rate per foot: ${treeProducts
      .map((product) => `${product.name} ${formatPrice(product.ratePerFoot)}`)
      .join(", ")}. Height × rate, rounded to the nearest ${formatPrice(roundTo)}.`,
  },
  {
    title: "One price per stand",
    body: `${standProducts
      .map((product) => `${product.name} ${formatPrice(product.price)}`)
      .join(", ")}. Already have a stand? Skip it.`,
  },
  {
    title: "Delivery by distance",
    body: `Pickup at the lot is free. Delivery is ${formatPrice(delivery.baseFee)} for the first ${delivery.includedMiles} miles, then ${formatPrice(delivery.perMile)} for each extra mile, up to ${delivery.maxMiles} miles.`,
  },
];

export function PricingSection() {
  return (
    // No top padding: the rule below separates this from the delivery section above.
    <section id="pricing" aria-labelledby="pricing-title" className="shell pb-20 sm:pb-28 lg:pb-36">
      <div className="reveal grid gap-7 border-t border-line pt-14 sm:pt-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Eyebrow className="mb-6 text-moss">How pricing works</Eyebrow>
          <h2 id="pricing-title" className="font-display text-display">
            Simple rules. <em className="text-berry">No surprises.</em>
          </h2>
        </div>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-moss md:col-span-4 md:justify-self-end">
          Every price on this site follows three rules. Pick a tree, a stand, and a way home to see
          the total build up line by line.
        </p>
      </div>

      <div className="mt-10 sm:mt-12">
        <SampleNotice title="Sample pricing for owner review.">
          These rates show how pricing works. They are not this season’s prices, and{" "}
          {business.owner} confirms every price.
        </SampleNotice>
      </div>

      <ol className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
        {rules.map((rule, index) => (
          <li key={rule.title} className="reveal border-t border-line pt-6">
            <span className="text-xs text-berry tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-2xl tracking-[-0.02em]">{rule.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-moss">{rule.body}</p>
          </li>
        ))}
      </ol>

      <div className="reveal mt-14 sm:mt-20">
        <PriceEstimator />
      </div>

      <div className="mt-14 max-w-3xl sm:mt-20">
        <h3 className="font-display text-2xl tracking-[-0.02em]">
          Tree prices by height
          <SampleTag className="text-berry" />
        </h3>
        <table className="mt-6 w-full border-collapse text-sm">
          <caption className="sr-only">
            Tree price for each height and variety. A dash means that height isn’t offered.
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-3 pr-4 text-left font-medium text-moss">
                Height
              </th>
              {treeProducts.map((product) => (
                <th key={product.id} scope="col" className="py-3 pl-4 text-right font-medium">
                  {product.name}
                  <span className="block text-xs font-normal text-moss">
                    {formatPrice(product.ratePerFoot)} per ft
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priceHeights.map((height) => (
              <tr key={height} className="border-b border-line">
                <th scope="row" className="py-3 pr-4 text-left font-normal text-moss">
                  {height} ft
                </th>
                {treeProducts.map((product) =>
                  rangesOverlap(product.sizes, { min: height, max: height }) ? (
                    <td key={product.id} className="py-3 pl-4 text-right tabular-nums">
                      {formatPrice(treePrice(height, product.ratePerFoot, roundTo))}
                    </td>
                  ) : (
                    <td key={product.id} className="py-3 pl-4 text-right text-moss">
                      <span aria-hidden="true">–</span>
                      <span className="sr-only">Not offered</span>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

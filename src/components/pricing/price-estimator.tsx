"use client";

import { useEffect, useRef, useState } from "react";

import { business, isSampleCatalog, pricing, standProducts, treeProducts } from "@/content/site";
import { clampHeight, formatHeightRange } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { buildEstimate, formatPrice, type DeliveryQuote } from "@/lib/pricing";
import { smsHref } from "@/lib/sms";

import { ButtonLink } from "../ui/button-link";
import { Choice, RangeField } from "../ui/form-controls";
import { Message, Phone } from "../ui/icons";
import { SampleTag } from "./sample-tag";

const { delivery } = pricing;
// The slider runs past the delivery limit so visitors can see what happens beyond it.
const mileLimits = { min: 1, max: delivery.maxMiles + 5, step: 1 };

type Line = { id: string; label: string; detail: string; amount: string; warning?: boolean };

function deliveryLine(quote: DeliveryQuote): Line {
  switch (quote.kind) {
    case "pickup":
      return { id: "delivery", label: "Pickup at the lot", detail: "No charge", amount: "$0" };
    case "delivery":
      return {
        id: "delivery",
        label: `Delivery, ${quote.miles} mi`,
        detail:
          quote.extraMiles > 0
            ? `${formatPrice(delivery.baseFee)} for the first ${delivery.includedMiles} mi + ${quote.extraMiles} extra mi × ${formatPrice(delivery.perMile)}`
            : `${formatPrice(delivery.baseFee)} covers the first ${delivery.includedMiles} mi`,
        amount: formatPrice(quote.fee),
      };
    case "out-of-area":
      return {
        id: "delivery",
        label: `Delivery, ${quote.miles} mi`,
        detail: `Over ${delivery.maxMiles} miles: call ${business.owner} to arrange it`,
        amount: "Call",
      };
  }
}

/**
 * Live price estimator. Every line shows the rule that produced it, so the
 * pricing logic is visible rather than just the total.
 */
export function PriceEstimator() {
  const [treeId, setTreeId] = useState((treeProducts[1] ?? treeProducts[0]).id);
  const [height, setHeight] = useState(pricing.heights.initial);
  const [standId, setStandId] = useState("none");
  const [delivering, setDelivering] = useState(false);
  const [miles, setMiles] = useState(8);
  const [announcement, setAnnouncement] = useState("");
  const hasInteracted = useRef(false);

  const tree = treeProducts.find((product) => product.id === treeId) ?? treeProducts[0];
  const stand = standProducts.find((product) => product.id === standId) ?? null;
  const standTooSmall = stand !== null && height > stand.maxTreeHeight;
  const estimate = buildEstimate(
    {
      heightFeet: height,
      ratePerFoot: tree.ratePerFoot,
      standPrice: stand?.price ?? null,
      deliveryMiles: delivering ? miles : null,
    },
    pricing,
  );

  const lines: Line[] = [
    {
      id: "tree",
      label: `${tree.name}, ${height} ft`,
      detail: `${height} ft × ${formatPrice(tree.ratePerFoot)} per ft, rounded to the nearest ${formatPrice(pricing.roundTo)}`,
      amount: formatPrice(estimate.tree),
    },
    stand
      ? {
          id: "stand",
          label: stand.name,
          detail: standTooSmall
            ? `Too small for a ${height} ft tree: fits up to ${stand.maxTreeHeight} ft`
            : `Flat price · fits trees up to ${stand.maxTreeHeight} ft`,
          amount: formatPrice(stand.price),
          warning: standTooSmall,
        }
      : { id: "stand", label: "No stand", detail: "Bring your own", amount: "$0" },
    deliveryLine(estimate.delivery),
  ];

  const total = formatPrice(estimate.total);
  const outOfArea = estimate.delivery.kind === "out-of-area";
  const isSample = isSampleCatalog;
  const deliveryNote = outOfArea ? ", plus delivery arranged by phone" : "";
  const standWarning = standTooSmall
    ? ` The ${stand.name.toLowerCase()} is too small for this tree.`
    : "";
  const summary = `Estimated total ${total}${deliveryNote}.${standWarning}`;
  const message = [
    `Hi ${business.owner}, I used the price estimator on your website:`,
    ...lines.map(
      (line) => `- ${line.label}: ${line.amount}${line.warning ? ` (${line.detail})` : ""}`,
    ),
    `Estimated total: ${total}${deliveryNote}${isSample ? " (sample pricing)" : ""}.`,
    "Could you confirm the price and availability?",
  ].join("\n");

  useEffect(() => {
    if (!hasInteracted.current) return;
    const timeout = setTimeout(() => setAnnouncement(summary), 700);
    return () => clearTimeout(timeout);
  }, [summary]);

  const interact =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      hasInteracted.current = true;
      setter(value);
    };

  // Each variety comes in its own height range, so keep the height inside it.
  const selectTree = (id: string) => {
    const next = treeProducts.find((product) => product.id === id) ?? tree;
    interact(setTreeId)(next.id);
    setHeight((current) => clampHeight(current, next.sizes));
  };

  return (
    <div className="grid overflow-hidden border border-line bg-paper lg:grid-cols-2">
      <form
        aria-label="Price estimator"
        className="flex flex-col gap-7 p-6 sm:p-10"
        onSubmit={(event) => event.preventDefault()}
      >
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Tree variety</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {treeProducts.map((product) => (
              <Choice
                key={product.id}
                type="radio"
                name="estimate-tree"
                value={product.id}
                checked={treeId === product.id}
                onChange={() => selectTree(product.id)}
              >
                <span className="text-center">
                  {product.name}
                  <span className="block text-[0.6875rem] opacity-75">
                    {formatPrice(product.ratePerFoot)} per ft
                  </span>
                </span>
              </Choice>
            ))}
          </div>
        </fieldset>

        <RangeField
          label="Tree height"
          hint={`${tree.name} comes in ${formatHeightRange(tree.sizes)}`}
          value={height}
          display={`${height} ft`}
          valueText={`${height} feet`}
          limits={{ ...tree.sizes, step: pricing.heights.step }}
          onChange={interact(setHeight)}
        />

        <fieldset>
          <legend className="mb-3 text-sm font-medium">Tree stand</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            <Choice
              type="radio"
              name="estimate-stand"
              value="none"
              checked={standId === "none"}
              onChange={() => interact(setStandId)("none")}
            >
              No stand
            </Choice>
            {standProducts.map((product) => (
              <Choice
                key={product.id}
                type="radio"
                name="estimate-stand"
                value={product.id}
                checked={standId === product.id}
                onChange={() => interact(setStandId)(product.id)}
              >
                <span className="text-center">
                  {product.name} · {formatPrice(product.price)}
                  <span className="block text-[0.6875rem] opacity-75">
                    Fits trees up to {product.maxTreeHeight} ft
                  </span>
                </span>
              </Choice>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-medium">Getting it home</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            <Choice
              type="radio"
              name="estimate-delivery"
              value="pickup"
              checked={!delivering}
              onChange={() => interact(setDelivering)(false)}
            >
              Pick up · free
            </Choice>
            <Choice
              type="radio"
              name="estimate-delivery"
              value="delivery"
              checked={delivering}
              onChange={() => interact(setDelivering)(true)}
            >
              Delivery
            </Choice>
          </div>
        </fieldset>

        {delivering && (
          <RangeField
            label="Distance from the lot"
            hint="In miles, one way"
            value={miles}
            display={`${miles} mi`}
            valueText={`${miles} miles`}
            limits={mileLimits}
            onChange={interact(setMiles)}
          />
        )}
      </form>

      <div className="flex flex-col gap-6 bg-sage p-6 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow text-moss">Your estimate</p>
          <SampleTag className="text-berry" />
        </div>

        <dl className="divide-y divide-sage-deep border-y border-sage-deep">
          {lines.map((line) => (
            <div key={line.id} className="flex items-start justify-between gap-6 py-4">
              <dt>
                <span className="block text-sm font-medium">{line.label}</span>
                <span
                  className={cn(
                    "mt-1 block text-xs leading-relaxed",
                    line.warning ? "font-medium text-berry" : "text-moss",
                  )}
                >
                  {line.detail}
                </span>
              </dt>
              <dd className="shrink-0 text-sm font-medium tabular-nums">{line.amount}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-end justify-between gap-6">
          <p className="pb-2 eyebrow text-moss">
            Estimated total
            {outOfArea && <span className="mt-1 block text-berry">Plus delivery by phone</span>}
          </p>
          <p className="font-display text-[clamp(2.75rem,8vw,4.5rem)] leading-none tracking-[-0.04em] text-pine tabular-nums">
            {total}
          </p>
        </div>
        <p className="text-xs leading-relaxed text-moss">
          Before sales tax.{" "}
          {isSample
            ? `Sample pricing for owner review: it shows how pricing works, not this season’s prices. ${business.owner} confirms every price.`
            : `An estimate only: ${business.owner} confirms the final price and availability.`}
        </p>
        <p role="status" className="sr-only">
          {announcement}
        </p>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <ButtonLink
            href={smsHref(business.phone.e164, message)}
            variant="berry"
            icon={<Message />}
          >
            Text this estimate
          </ButtonLink>
          <ButtonLink href={business.phone.href} icon={<Phone />}>
            Call {business.owner}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

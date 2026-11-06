import Image from "next/image";

import { business, deliveryDetails, images, pricing } from "@/content/site";
import { formatPrice } from "@/lib/pricing";

import { SampleTag } from "../pricing/sample-tag";
import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { Phone } from "../ui/icons";
import { TextLink } from "../ui/text-link";
import { InquiryButton } from "./inquiry-form";

const { baseFee, includedMiles, perMile, maxMiles } = pricing.delivery;

const feeDetails = [
  {
    label: "Delivery charge",
    value: `${formatPrice(baseFee)} for the first ${includedMiles} miles`,
  },
  { label: "Extra miles", value: `${formatPrice(perMile)} per mile, up to ${maxMiles} miles` },
];

export function Delivery() {
  return (
    <section
      id="delivery"
      aria-labelledby="delivery-title"
      className="shell py-20 sm:py-28 lg:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="reveal lg:col-span-5">
          <Eyebrow className="mb-6 text-moss">Getting your tree home</Eyebrow>
          <h2 id="delivery-title" className="font-display text-display">
            Delivery details, <em className="text-berry">clearly stated.</em>
          </h2>
          <p className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-moss">
            Your tree, delivered to your door. A base fee covers homes near the lot, and each extra
            mile adds a small charge, so you know the cost before you ask.
          </p>

          <dl className="mt-9 border-t border-line">
            {[...deliveryDetails, ...feeDetails].map((detail) => (
              <div
                key={detail.label}
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 border-b border-line py-4 text-sm"
              >
                <dt className="text-moss">{detail.label}</dt>
                <dd className="text-right font-medium">
                  {detail.value}
                  <SampleTag />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <InquiryButton interest="Delivery information" variant="berry">
              Prepare a delivery inquiry
            </InquiryButton>
            <ButtonLink href={business.phone.href} icon={<Phone />}>
              Call {business.owner}
            </ButtonLink>
          </div>
          <TextLink href="#pricing" className="mt-3 text-pine">
            Work out a delivery fee in the price estimator
          </TextLink>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7">
          <div className="unveil relative aspect-[4/5] overflow-hidden bg-sage">
            <Image
              src={images.delivery.src}
              alt={images.delivery.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 flex justify-between gap-4 text-xs text-moss">
            <span>Illustrative transport image · not an actual delivery vehicle</span>
            <span aria-hidden="true">04</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

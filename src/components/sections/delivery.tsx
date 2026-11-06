import Image from "next/image";

import { business, deliveryDetails, images } from "@/content/site";

import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { Phone } from "../ui/icons";

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
            Delivery has not been confirmed for this season. The structure below is ready for the
            owner’s service areas and fees as soon as they are approved.
          </p>

          <dl className="mt-9 border-t border-line">
            {deliveryDetails.map((detail) => (
              <div
                key={detail.label}
                className="grid grid-cols-2 gap-5 border-b border-line py-4 text-sm"
              >
                <dt className="text-moss">{detail.label}</dt>
                <dd className="text-right font-medium">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#inquiry" variant="berry">
              Prepare a delivery inquiry
            </ButtonLink>
            <ButtonLink href={business.phone.href} icon={<Phone />}>
              Call {business.owner}
            </ButtonLink>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-moss">
            No automatic mileage quote is provided because the pricing rules have not been
            confirmed.
          </p>
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

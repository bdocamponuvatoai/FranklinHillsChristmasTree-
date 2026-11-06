import { business, proposedLocation, unconfirmedDetails } from "@/content/site";

import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { ArrowUpRight, MapPin, Phone } from "../ui/icons";
import { InquiryForm } from "./inquiry-form";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="shell py-20 sm:py-28 lg:py-36">
      <div className="reveal grid gap-7 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Eyebrow className="mb-6 text-moss">Contact &amp; visit</Eyebrow>
          <h2 id="visit-title" className="font-display text-display">
            Plan the visit. <em className="text-berry">Bring Christmas home.</em>
          </h2>
        </div>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-moss md:col-span-4 md:justify-self-end">
          Call or send a text inquiry before making the trip. The address, operating hours, and
          season dates are still awaiting owner confirmation.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a
            href={business.phone.href}
            className="group flex items-center justify-between gap-6 border-y border-line py-6 transition-colors hover:text-berry sm:py-8"
          >
            <span>
              <span className="block text-xs tracking-[0.12em] text-moss uppercase">
                Talk to {business.owner}
              </span>
              <span className="mt-2 block font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.032em] tabular-nums">
                {business.phone.display}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="grid size-14 shrink-0 place-items-center rounded-full bg-berry text-2xl text-paper transition-transform duration-500 ease-spring group-hover:rotate-45 sm:size-16"
            >
              <ArrowUpRight />
            </span>
          </a>

          <div className="mt-6 border border-line bg-sage p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-pine text-xl text-paper">
                <MapPin />
              </span>
              <div>
                <p className="text-[0.625rem] font-medium tracking-[0.14em] text-berry uppercase">
                  {proposedLocation.status}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight">Proposed lot address</h3>
                <address className="mt-3 text-sm leading-relaxed text-moss not-italic">
                  {proposedLocation.address}
                </address>
              </div>
            </div>
            <p className="mt-6 border-t border-sage-deep pt-5 text-xs leading-relaxed text-moss">
              Do not rely on this address until the owner confirms it. Google Maps opens only as a
              preview of the proposed location.
            </p>
            <ButtonLink
              href={proposedLocation.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full sm:w-auto"
            >
              Preview in Google Maps
            </ButtonLink>
          </div>

          <div className="mt-6 border border-line p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl">Hours &amp; season</h3>
              <span className="rounded-full bg-sage px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.1em] text-berry uppercase">
                Pending
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-moss">
              Opening dates and daily hours have not been approved for publication. Call before
              visiting.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <InquiryForm />
          <div className="mt-6 bg-berry p-6 text-paper sm:p-8">
            <p className="eyebrow text-paper/70">Still to be confirmed</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {unconfirmedDetails.map((detail) => (
                <li key={detail} className="border border-paper/25 px-3 py-2 text-xs text-paper/85">
                  {detail}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={business.phone.href}
              variant="ivory"
              icon={<Phone />}
              className="mt-7 w-full sm:w-auto"
            >
              Call {business.owner} instead
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

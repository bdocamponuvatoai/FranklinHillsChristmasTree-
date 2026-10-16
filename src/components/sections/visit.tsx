import { business, unconfirmedDetails } from "@/content/site";

import { ButtonLink } from "../ui/button-link";
import { Eyebrow } from "../ui/eyebrow";
import { ArrowUpRight, Phone } from "../ui/icons";
import { TreeMark } from "../ui/tree-mark";

export function Visit() {
  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="shell grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:items-end lg:py-36"
    >
      <div className="reveal lg:col-span-7">
        <Eyebrow className="mb-6 text-moss">Let’s make it feel like Christmas</Eyebrow>
        <h2 id="visit-title" className="font-display text-display">
          Your tree is the start. <em className="text-berry">The memories are yours.</em>
        </h2>
        <p className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-moss">
          For seasonal dates, the lot location and current selection, get in touch with{" "}
          {business.owner}, owner.
        </p>

        <a
          href={business.phone.href}
          className="group mt-10 flex items-center justify-between gap-6 border-y border-line py-6 transition-colors hover:text-berry sm:py-8"
        >
          <span className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-[-0.032em] tabular-nums">
            {business.phone.display}
          </span>
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-full bg-berry text-2xl text-paper transition-transform duration-500 ease-spring group-hover:rotate-45 sm:size-20 sm:text-3xl"
          >
            <ArrowUpRight />
          </span>
        </a>
        <p className="mt-4 text-xs text-moss">Plan ahead · Please confirm hours before visiting</p>
      </div>

      <aside
        aria-labelledby="ask-title"
        className="reveal relative overflow-hidden rounded-[1.25rem] bg-berry p-7 text-paper sm:rounded-[1.75rem] sm:p-10 lg:col-span-5"
      >
        <TreeMark className="absolute -right-8 -bottom-10 h-64 w-52 rotate-[8deg] text-paper/15" />
        <p id="ask-title" className="eyebrow text-paper/75">
          Ask {business.owner} about
        </p>
        <ul className="relative mt-6 flex flex-wrap gap-2">
          {unconfirmedDetails.map((detail) => (
            <li
              key={detail}
              className="rounded-full border border-paper/30 px-4 py-2 text-sm text-paper/90"
            >
              {detail}
            </li>
          ))}
        </ul>
        <p className="relative mt-8 max-w-xs text-sm leading-relaxed text-paper/75">
          These details haven’t been confirmed on the website yet — a quick call gets you the
          latest.
        </p>
        <ButtonLink
          href={business.phone.href}
          variant="ivory"
          icon={<Phone />}
          className="relative mt-8 w-full sm:w-auto"
        >
          Call {business.owner}
        </ButtonLink>
      </aside>
    </section>
  );
}

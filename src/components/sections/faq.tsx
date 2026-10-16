import { business, faqs } from "@/content/site";

import { Eyebrow } from "../ui/eyebrow";
import { Plus } from "../ui/icons";
import { TextLink } from "../ui/text-link";

/** Native exclusive accordion: works without JavaScript, animates where supported. */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="shell grid gap-12 border-t border-line py-20 sm:py-28 lg:grid-cols-12 lg:py-36"
    >
      <div className="reveal lg:col-span-4">
        <Eyebrow className="mb-6 text-moss">Good to know</Eyebrow>
        <h2 id="faq-title" className="font-display text-display">
          A few things <em className="text-berry">before you visit.</em>
        </h2>
        <TextLink href={business.phone.href} className="mt-6 text-pine">
          Have another question? Call us
        </TextLink>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            name="faq"
            open={index === 0}
            className="disclosure group border-b border-line first:border-t"
          >
            <summary className="flex min-h-18 cursor-pointer items-center justify-between gap-6 py-5 text-base font-medium transition-colors hover:text-berry sm:text-lg">
              {faq.question}
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-lg transition-[rotate,background-color,color] duration-500 ease-spring group-open:rotate-45 group-open:border-pine group-open:bg-pine group-open:text-paper"
              >
                <Plus />
              </span>
            </summary>
            <p className="max-w-xl pr-14 pb-7 text-[0.9375rem] leading-relaxed text-moss">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

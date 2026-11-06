"use client";

import { useEffect, useRef, type ComponentProps, type FormEvent } from "react";

import { business, treeProducts } from "@/content/site";
import { smsHref } from "@/lib/sms";

import { ButtonLink } from "../ui/button-link";
import { Message } from "../ui/icons";

const INTEREST_EVENT = "inquiry:interest";

/** Pre-selects the form's "I'm interested in" option, e.g. from a catalog card. */
export function prefillInquiry(interest: string) {
  window.dispatchEvent(new CustomEvent<string>(INTEREST_EVENT, { detail: interest }));
}

/** Jumps to the inquiry form with `interest` already selected. */
export function InquiryButton({
  interest,
  ...props
}: { interest: string } & Omit<ComponentProps<typeof ButtonLink>, "href" | "onClick">) {
  return <ButtonLink href="#inquiry" onClick={() => prefillInquiry(interest)} {...props} />;
}

export function InquiryForm() {
  const interestRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const select = (event: Event) => {
      const interest = (event as CustomEvent<string>).detail;
      const field = interestRef.current;
      if (field && [...field.options].some((option) => option.value === interest)) {
        field.value = interest;
      }
    };
    window.addEventListener(INTEREST_EVENT, select);
    return () => window.removeEventListener(INTEREST_EVENT, select);
  }, []);

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    // Empty fields come back as "", so fall back with || rather than ??.
    const field = (name: string) => String(new FormData(form).get(name) ?? "").trim();
    const lines = [
      `Hi ${business.owner}, I’m ${field("name")}.`,
      `I’m asking about: ${field("interest")}.`,
      `Preferred height: ${field("height") || "Not sure yet"}.`,
      field("message"),
    ];
    window.location.href = smsHref(business.phone.e164, lines.join("\n"));
  };

  const fieldClass =
    "min-h-12 w-full border-b border-paper/30 bg-transparent px-0 py-3 text-sm text-paper outline-none placeholder:text-paper/45 focus:border-glow";

  return (
    <form id="inquiry" onSubmit={submitInquiry} className="bg-pine p-6 text-paper sm:p-9">
      <p className="eyebrow text-frost">Start an inquiry</p>
      <h3 className="mt-5 font-display text-3xl tracking-[-0.03em] sm:text-4xl">
        Tell us what you’re looking for.
      </h3>
      <p id="inquiry-help" className="mt-4 max-w-lg text-sm leading-relaxed text-paper/65">
        This form opens a pre-filled text message on your device. No information is stored on this
        website.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="grid gap-1 text-xs text-paper/70">
          Your name
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            className={fieldClass}
            placeholder="Name"
          />
        </label>
        <label className="grid gap-1 text-xs text-paper/70">
          I’m interested in
          <select ref={interestRef} name="interest" required className={fieldClass} defaultValue="">
            <option value="" disabled className="text-ink">
              Choose one
            </option>
            {treeProducts.map((tree) => (
              <option key={tree.id} className="text-ink">
                {tree.name}
              </option>
            ))}
            <option className="text-ink">A Christmas tree (help me choose)</option>
            <option className="text-ink">A tree stand</option>
            <option className="text-ink">Delivery information</option>
            <option className="text-ink">Visit details</option>
          </select>
        </label>
        <label className="grid gap-1 text-xs text-paper/70">
          Preferred height
          <input
            name="height"
            type="text"
            maxLength={40}
            className={fieldClass}
            placeholder="For example: around 7 ft"
          />
        </label>
        <label className="grid gap-1 text-xs text-paper/70">
          What would you like to know?
          <input
            name="message"
            type="text"
            required
            maxLength={240}
            className={fieldClass}
            placeholder="Availability, price, fit, delivery…"
          />
        </label>
      </div>

      <button
        type="submit"
        aria-describedby="inquiry-help"
        className="mt-8 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-paper px-6 text-sm font-medium text-pine transition-colors hover:bg-frost sm:w-auto"
      >
        <Message className="text-lg" /> Open text message
      </button>
    </form>
  );
}

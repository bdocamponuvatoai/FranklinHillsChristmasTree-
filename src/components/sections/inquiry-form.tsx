"use client";

import type { FormEvent } from "react";

import { business } from "@/content/site";

import { Message } from "../ui/icons";

export function InquiryForm() {
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = [
      `Hi ${business.owner}, I’m ${String(data.get("name") ?? "")}.`,
      `I’m asking about: ${String(data.get("interest") ?? "")}.`,
      `Preferred height: ${String(data.get("height") ?? "Not sure yet")}.`,
      String(data.get("message") ?? ""),
    ];
    window.location.href = `sms:${business.phone.e164}?body=${encodeURIComponent(lines.join("\n"))}`;
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
          <select name="interest" required className={fieldClass} defaultValue="">
            <option value="" disabled className="text-ink">
              Choose one
            </option>
            <option className="text-ink">A Christmas tree</option>
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

import type { ReactNode } from "react";

import { isSampleCatalog } from "@/content/site";
import { cn } from "@/lib/cn";

/** Marks a detail as sample content. Renders nothing once the catalog is confirmed. */
export function SampleTag({ className }: { className?: string }) {
  if (!isSampleCatalog) return null;
  return (
    <span
      className={cn(
        "ml-2 inline-block rounded-full border border-current px-2 py-0.5 align-middle text-[0.625rem] font-medium tracking-[0.08em] uppercase",
        className,
      )}
    >
      Sample
    </span>
  );
}

/** Banner explaining that a section shows sample content; hidden once confirmed. */
export function SampleNotice({ title, children }: { title: string; children: ReactNode }) {
  if (!isSampleCatalog) return null;
  return (
    <p className="border-l-2 border-berry bg-sage px-5 py-4 text-sm leading-relaxed">
      <strong className="font-medium">{title}</strong> {children}
    </p>
  );
}

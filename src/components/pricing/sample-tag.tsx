import { pricing } from "@/content/site";
import { cn } from "@/lib/cn";

/** Marks a price as a sample rate. Renders nothing once `pricing.status` is "confirmed". */
export function SampleTag({ className }: { className?: string }) {
  if (pricing.status !== "sample") return null;
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

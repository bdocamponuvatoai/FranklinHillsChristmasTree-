import Link from "next/link";

import { business } from "@/content/site";
import { cn } from "@/lib/cn";

import { TreeMark } from "./tree-mark";

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${business.name} — home`}
      className={cn("group inline-flex shrink-0 items-center gap-3", className)}
    >
      <TreeMark className="h-10 w-8 transition-transform duration-500 ease-spring group-hover:-rotate-6" />
      <span className="flex flex-col">
        <span className="font-display text-[1.45rem] leading-none tracking-[-0.03em] sm:text-[1.7rem]">
          {business.shortName}
        </span>
        <span className="mt-1.5 text-[0.5rem] font-medium tracking-[0.3em] uppercase">
          {business.descriptor}
        </span>
      </span>
    </Link>
  );
}

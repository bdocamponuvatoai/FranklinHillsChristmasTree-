import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { ArrowUpRight } from "./icons";

/** Underlined inline link whose rule draws in from the left on hover. */
export function TextLink({ children, className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "group/link relative inline-flex min-h-12 items-center gap-3 text-sm font-medium",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-1 h-px origin-left bg-current opacity-35"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover/link:scale-x-100"
        />
      </span>
      <ArrowUpRight className="transition-transform duration-500 ease-spring group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}

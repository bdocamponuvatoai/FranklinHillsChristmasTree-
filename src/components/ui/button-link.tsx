import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ArrowUpRight } from "./icons";

const variants = {
  pine: "bg-pine text-paper hover:bg-berry [--chip:var(--color-paper)] [--chip-ink:var(--color-pine)] hover:[--chip-ink:var(--color-berry)]",
  ivory:
    "bg-paper text-pine hover:bg-white [--chip:var(--color-pine)] [--chip-ink:var(--color-paper)]",
  berry:
    "bg-berry text-paper hover:bg-berry-deep [--chip:var(--color-paper)] [--chip-ink:var(--color-berry)]",
  glass:
    "border border-paper/30 bg-paper/10 text-paper backdrop-blur-md hover:bg-paper/20 [--chip:var(--color-paper)] [--chip-ink:var(--color-pine)]",
} as const;

type ButtonLinkProps = Omit<ComponentProps<"a">, "children"> & {
  children: ReactNode;
  variant?: keyof typeof variants;
  icon?: ReactNode;
};

/**
 * Pill-shaped call to action with a circular icon chip. Renders a plain anchor
 * because every CTA on this site is an in-page anchor or a `tel:` link.
 */
export function ButtonLink({
  children,
  variant = "pine",
  icon = <ArrowUpRight />,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "group/button inline-flex min-h-13 items-center justify-between gap-5 rounded-full py-1.5 pr-1.5 pl-6 text-sm font-medium tracking-[-0.005em] transition-colors duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-(--chip) text-base text-(--chip-ink) transition-transform duration-500 ease-spring group-hover/button:rotate-45"
      >
        {icon}
      </span>
    </a>
  );
}

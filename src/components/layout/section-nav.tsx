"use client";

import { useEffect, useState } from "react";

import { navigation } from "@/content/site";
import { cn } from "@/lib/cn";

/** Desktop chapter navigation that highlights the section currently in view. */
export function SectionNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // A thin band just above the middle of the viewport decides the active chapter.
      { rootMargin: "-38% 0px -58% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-full border border-line/80 bg-paper/60 p-1">
        {navigation.map((item) => {
          const isActive = activeId === item.href.slice(1);
          return (
            <li key={item.href}>
              <a
                href={`/${item.href}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.8125rem] transition-colors duration-300",
                  isActive ? "bg-pine text-paper" : "text-ink hover:bg-sage",
                )}
              >
                <span
                  className={cn(
                    "text-[0.625rem] tabular-nums",
                    isActive ? "text-frost" : "text-moss",
                  )}
                >
                  {item.index}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

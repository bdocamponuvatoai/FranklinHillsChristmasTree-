"use client";

import { useEffect, useState } from "react";

import { business } from "@/content/site";
import { cn } from "@/lib/cn";

import { Phone } from "../ui/icons";

/**
 * Thumb-reachable action bar for phones. It appears once the hero has scrolled
 * away and steps aside while the visit section (which has the same actions)
 * is on screen.
 */
export function MobileDock() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [visitVisible, setVisitVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const visit = document.getElementById("visit");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === visit) setVisitVisible(entry.isIntersecting);
      }
    });
    if (hero) observer.observe(hero);
    if (visit) observer.observe(visit);
    return () => observer.disconnect();
  }, []);

  const visible = !heroVisible && !visitVisible;

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] transition-[translate,opacity] duration-500 ease-out-expo lg:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="flex items-center gap-2 rounded-full border border-paper/10 bg-pine-deep/90 p-1.5 text-paper shadow-[0_18px_40px_-12px_rgb(11_35_28/0.55)] backdrop-blur-xl">
        <a
          href={business.phone.href}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-paper text-sm font-medium text-pine"
        >
          <Phone /> Call {business.owner}
        </a>
        <a
          href="#planner"
          className="flex min-h-12 flex-1 items-center justify-center rounded-full text-sm font-medium"
        >
          Plan my tree
        </a>
      </div>
    </div>
  );
}

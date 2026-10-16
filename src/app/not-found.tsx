import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/icons";
import { TreeMark } from "@/components/ui/tree-mark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="px-2 pt-2 sm:px-4 sm:pt-4">
      <div className="relative isolate flex min-h-[70svh] flex-col items-center justify-center overflow-hidden rounded-[1.25rem] bg-pine px-6 py-24 text-center text-paper sm:rounded-[2rem]">
        <TreeMark className="absolute -bottom-16 left-1/2 -z-10 h-[28rem] w-80 -translate-x-1/2 text-paper/10" />
        <p className="eyebrow text-frost">404 · A little off the path</p>
        <h1 className="mt-6 font-display text-display">
          Let’s get you <em className="text-frost">back to Christmas.</em>
        </h1>
        <p className="mt-6 text-paper/75">This page could not be found.</p>
        <Link
          href="/"
          className="group mt-10 inline-flex min-h-13 items-center gap-5 rounded-full bg-paper py-1.5 pr-1.5 pl-6 text-sm font-medium text-pine"
        >
          Back to Franklin Hills
          <span className="grid size-10 place-items-center rounded-full bg-pine text-paper transition-transform duration-500 ease-spring group-hover:rotate-45">
            <ArrowUpRight />
          </span>
        </Link>
      </div>
    </section>
  );
}

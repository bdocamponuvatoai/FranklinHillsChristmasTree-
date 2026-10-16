import { tips } from "@/content/site";

import { TreePlanner } from "../planner/tree-planner";
import { Eyebrow } from "../ui/eyebrow";

export function PlannerSection() {
  return (
    <section id="planner" aria-labelledby="planner-title" className="shell py-20 sm:py-28 lg:py-36">
      <div className="reveal mb-12 grid gap-6 sm:mb-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Eyebrow className="mb-6 text-moss">A little planning. A lot of Christmas.</Eyebrow>
          <h2 id="planner-title" className="font-display text-display">
            Find your tree’s <em className="text-berry">happy place.</em>
          </h2>
        </div>
        <p className="max-w-xs text-[0.9375rem] leading-relaxed text-moss md:col-span-4 md:justify-self-end">
          Before you fall in love with a tree, make a little room for it.
        </p>
      </div>

      <div className="reveal">
        <TreePlanner />
      </div>

      <ol className="mt-14 grid gap-10 sm:mt-20 md:grid-cols-3 md:gap-8">
        {tips.map((tip, index) => (
          <li key={tip.title} className="reveal border-t border-line pt-6">
            <span className="text-xs text-berry tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-2xl tracking-[-0.02em]">{tip.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-moss">{tip.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

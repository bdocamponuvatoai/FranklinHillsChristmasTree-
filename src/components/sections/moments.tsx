import { Eyebrow } from "../ui/eyebrow";
import { SceneShowcase } from "./scene-showcase";

export function Moments() {
  return (
    <section id="moments" aria-labelledby="moments-title" className="shell py-20 sm:py-28 lg:py-36">
      <div className="reveal mb-12 grid gap-6 sm:mb-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Eyebrow className="mb-6 text-moss">Some things can’t be unboxed</Eyebrow>
          <h2 id="moments-title" className="font-display text-display">
            That unmistakable <em>Christmas feeling.</em>
          </h2>
        </div>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-moss md:col-span-4 md:justify-self-end">
          Follow the season from the first fresh-pine breath to the last ribbon tied.
        </p>
      </div>

      <div className="reveal">
        <SceneShowcase />
      </div>
      <p className="mt-4 text-xs text-moss">
        An imagined season, brought to life — illustrative imagery, not the actual lot.
      </p>
    </section>
  );
}

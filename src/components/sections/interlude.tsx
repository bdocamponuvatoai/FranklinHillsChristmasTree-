import { Asterisk } from "../ui/icons";

export function Interlude() {
  return (
    <section aria-label="A Christmas tradition" className="px-2 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[1.25rem] bg-pine px-6 py-24 text-center text-paper sm:rounded-[2rem] sm:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_100%,rgb(246_220_162/0.16),transparent_70%)]"
        />
        <p className="eyebrow text-frost">Once a year. Every year. Always special.</p>
        <p className="reveal mx-auto mt-8 max-w-5xl font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-[-0.032em]">
          The tree changes. <em className="text-frost">The feeling stays.</em>
        </p>
        <Asterisk className="mx-auto mt-12 animate-[spin_24s_linear_infinite] text-5xl text-frost" />
      </div>
    </section>
  );
}

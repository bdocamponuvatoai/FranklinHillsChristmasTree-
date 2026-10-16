import { business } from "@/content/site";

export function AnnouncementBar() {
  return (
    <aside id="top" aria-label="Seasonal notice" className="bg-pine text-paper">
      <p className="shell flex min-h-9 items-center justify-center gap-3 py-2 text-center text-[0.6875rem] tracking-[0.04em]">
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 animate-beacon rounded-full bg-glow"
        />
        <span>
          <span className="hidden sm:inline">A little Christmas starts here · </span>
          Call for this season’s dates &amp; availability
        </span>
        <a
          href={business.phone.href}
          className="font-medium whitespace-nowrap underline decoration-paper/40 underline-offset-4 transition-colors hover:decoration-paper"
        >
          {business.phone.display}
        </a>
      </p>
    </aside>
  );
}

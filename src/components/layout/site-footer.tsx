import { business, imageDisclaimer, navigation } from "@/content/site";

import { Brand } from "../ui/brand";
import { ArrowUp, ArrowUpRight } from "../ui/icons";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-sage pt-16 pb-28 sm:pt-20 lg:pb-8">
      <div className="shell">
        <div className="grid gap-12 border-b border-sage-deep pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Brand />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-moss">{business.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="mb-5 eyebrow text-moss">Explore</p>
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={`/${item.href}`}
                    className="inline-flex min-h-10 items-center text-sm transition-colors hover:text-berry"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="mb-5 eyebrow text-moss">Talk to {business.owner}</p>
            <a
              href={business.phone.href}
              className="group inline-flex items-center gap-3 font-display text-3xl tracking-[-0.03em] transition-colors hover:text-berry"
            >
              {business.phone.display}
              <ArrowUpRight className="text-xl transition-transform duration-500 ease-spring group-hover:rotate-45" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-moss">
              Call for season dates, the lot location and current selection.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-xs text-moss md:flex-row md:items-center md:justify-between">
          <p>
            © {business.season} {business.name}
          </p>
          <p className="max-w-md">{imageDisclaimer}</p>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 font-medium text-ink transition-colors hover:text-berry"
          >
            Back to top <ArrowUp />
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="reveal mt-4 text-center font-display text-wordmark whitespace-nowrap text-pine select-none"
      >
        {business.shortName}
      </p>
    </footer>
  );
}

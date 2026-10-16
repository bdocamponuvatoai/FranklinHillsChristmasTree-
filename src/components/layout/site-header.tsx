import { business } from "@/content/site";

import { Brand } from "../ui/brand";
import { ButtonLink } from "../ui/button-link";
import { Phone } from "../ui/icons";
import { MobileMenu } from "./mobile-menu";
import { SectionNav } from "./section-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="shell flex h-18 items-center justify-between gap-6 lg:h-20">
        <Brand />
        <SectionNav />
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={business.phone.href} icon={<Phone />}>
              Let’s talk Christmas
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
      {/* Reading progress — driven by a CSS scroll timeline where supported. */}
      <span
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 -bottom-px hidden h-0.5 origin-left bg-berry"
      />
    </header>
  );
}

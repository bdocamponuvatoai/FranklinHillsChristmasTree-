import { MobileDock } from "@/components/layout/mobile-dock";
import { Decorations } from "@/components/sections/decorations";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Interlude } from "@/components/sections/interlude";
import { Marquee } from "@/components/sections/marquee";
import { Moments } from "@/components/sections/moments";
import { PlannerSection } from "@/components/sections/planner-section";
import { Statement } from "@/components/sections/statement";
import { Tradition } from "@/components/sections/tradition";
import { Visit } from "@/components/sections/visit";
import { business, faqs } from "@/content/site";
import { siteUrl } from "@/lib/site-config";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": new URL("/#organization", siteUrl).href,
      name: business.name,
      url: siteUrl.href,
      description: business.description,
      telephone: business.phone.e164,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: business.phone.e164,
        contactType: "customer service",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Marquee />
      <Moments />
      <Statement />
      <Tradition />
      <Decorations />
      <PlannerSection />
      <Faq />
      <Interlude />
      <Visit />
      <MobileDock />
    </>
  );
}

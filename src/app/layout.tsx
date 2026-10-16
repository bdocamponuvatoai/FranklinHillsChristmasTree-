import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { business } from "@/content/site";
import { isIndexable, siteUrl } from "@/lib/site-config";

import "./globals.css";

// Fonts are self-hosted at build time by next/font — no runtime requests to Google.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const title = `${business.name} | Bring Christmas Home`;
const description = `Fresh Christmas trees and holiday decorations from ${business.name}. Contact owner ${business.owner} at ${business.phone.display} for seasonal details.`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: `%s | ${business.shortName}` },
  description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: business.name,
    title: `${business.shortName} — Bring Christmas Home`,
    description: business.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.shortName} — Bring Christmas Home`,
    description: business.tagline,
  },
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  // Only the explicit tel: links should be tappable — not "7 ft" or similar.
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#15392e",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${fraunces.variable} ${geist.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-pine px-5 py-3 text-sm text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

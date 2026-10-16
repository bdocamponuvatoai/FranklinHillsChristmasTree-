/**
 * Single source of truth for every business fact and piece of copy on the site.
 *
 * Facts marked "unconfirmed" must stay that way until the owner confirms them —
 * never infer an address, hours, prices or stock from the business name or imagery.
 * `llms.txt`, JSON-LD and metadata are all generated from this file.
 */
import type { StaticImageData } from "next/image";

import detailImage from "@/assets/images/detail.webp";
import heroImage from "@/assets/images/hero.webp";
import homeImage from "@/assets/images/home.webp";

export const business = {
  name: "Franklin Hills Christmas Tree Lot",
  shortName: "Franklin Hills",
  descriptor: "Christmas Tree Lot",
  owner: "Eduard",
  season: 2026,
  description:
    "Seasonal holiday retailer specializing in fresh Christmas trees and holiday-related decorations.",
  tagline: "Fresh trees. Familiar traditions. A little Christmas magic.",
  phone: {
    display: "(323) 422-9916",
    e164: "+13234229916",
    href: "tel:+13234229916",
  },
} as const;

/** Details customers ask about that the owner has not yet confirmed for publication. */
export const unconfirmedDetails = [
  "Season dates",
  "Opening hours",
  "Lot address",
  "Tree sizes & varieties",
  "Pricing",
  "Reservations & delivery",
] as const;

export const imageDisclaimer =
  "Imagery is AI-created seasonal inspiration — not photos of the actual lot or current stock.";

export type NavItem = { href: `#${string}`; label: string; index: string };

export const navigation: readonly NavItem[] = [
  { href: "#moments", label: "The season", index: "01" },
  { href: "#tradition", label: "The tradition", index: "02" },
  { href: "#planner", label: "Tree planner", index: "03" },
  { href: "#visit", label: "Plan your visit", index: "04" },
];

export type SiteImage = { src: StaticImageData; alt: string };

export const images = {
  hero: {
    src: heroImage,
    alt: "Seasonal illustration of fresh evergreen trees under warm string lights at dusk",
  },
  home: {
    src: homeImage,
    alt: "Christmas inspiration: a decorated evergreen tree in a warm, sunlit living room",
  },
  detail: {
    src: detailImage,
    alt: "Holiday inspiration: hands tying a cranberry ribbon on an evergreen wreath",
  },
} satisfies Record<string, SiteImage>;

export type Scene = {
  id: string;
  label: string;
  chapter: string;
  title: string;
  description: string;
  image: SiteImage;
};

export const scenes: readonly Scene[] = [
  {
    id: "search",
    label: "At the lot",
    chapter: "The search",
    title: "You’ll know when it’s the one.",
    description: "A slow walk. A fresh pine scent. A tree with a personality all its own.",
    image: images.hero,
  },
  {
    id: "homecoming",
    label: "Coming home",
    chapter: "The homecoming",
    title: "And suddenly, it feels like Christmas.",
    description:
      "Your favorite corner. A few familiar ornaments. The first evening with the lights on.",
    image: images.home,
  },
  {
    id: "details",
    label: "Little details",
    chapter: "The little things",
    title: "The details become the tradition.",
    description:
      "A ribbon tied just so. A little green by the door. Small touches that make it yours.",
    image: images.detail,
  },
];

export const marqueeItems = [
  "Fresh Christmas trees",
  "Holiday decorations",
  "Little rituals",
  "Lasting memories",
  "Familiar traditions",
] as const;

export const tips = [
  {
    title: "Measure your corner",
    body: "Check ceiling height and floor space. Leave room for branches, ornaments, and a clear walking path.",
  },
  {
    title: "Know your style",
    body: `Think full and statement-making or slim and understated. Ask ${business.owner} which trees are available.`,
  },
  {
    title: "Plan the journey home",
    body: "Call ahead to discuss transport, available services, and anything you’ll need to bring.",
  },
] as const;

export const faqs = [
  {
    question: "When does the lot open for the season?",
    answer: `Season dates and opening hours have not yet been confirmed here. Call ${business.owner} at ${business.phone.display} for the latest details before making the trip.`,
  },
  {
    question: "Where is the Christmas tree lot?",
    answer: `Please call ${business.owner} for the current lot address and directions. We’ll add a verified location here once confirmed.`,
  },
  {
    question: "What tree sizes and varieties are available?",
    answer:
      "Selection and pricing depend on current stock. Call with your preferred height and shape to ask what is available. The tree planner above can help you prepare.",
  },
  {
    question: "Do you sell holiday decorations?",
    answer: `Yes. ${business.name} specializes in fresh Christmas trees and holiday-related decorations. Ask ${business.owner} about this season’s specific items and prices.`,
  },
  {
    question: "Can I reserve a tree or arrange delivery?",
    answer: `Reservations, delivery, and other services are not confirmed on this website. Please call ${business.owner} to discuss your needs before making plans.`,
  },
] as const;

/**
 * Single source of truth for every business fact and piece of copy on the site.
 *
 * Facts marked "unconfirmed" must stay that way until the owner confirms them —
 * never infer an address, hours, prices or stock from the business name or imagery.
 * `llms.txt`, JSON-LD and metadata are all generated from this file.
 */
import type { StaticImageData } from "next/image";

import { formatHeightRange, type HeightRange } from "@/lib/catalog";
import type { PricingRules } from "@/lib/pricing";

import deliveryImage from "@/assets/images/delivery.webp";
import detailImage from "@/assets/images/detail.webp";
import heroImage from "@/assets/images/hero.webp";
import homeImage from "@/assets/images/home.webp";
import treeSeasonal01Image from "@/assets/images/tree-seasonal-01.webp";
import treeSeasonal02Image from "@/assets/images/tree-seasonal-02.webp";
import treeSeasonal03Image from "@/assets/images/tree-seasonal-03.webp";
import treeSelectionImage from "@/assets/images/tree-selection.webp";
import treeStandsImage from "@/assets/images/tree-stands.webp";

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
  "Stand inventory",
  "Reservations & delivery",
] as const;

export const proposedLocation = {
  address: "1256 S Glendale Ave, Glendale, CA 91205",
  status: "Pending client confirmation",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=1256%20S%20Glendale%20Ave%2C%20Glendale%2C%20CA%2091205",
} as const;

/** Proposed season and hours, shown as proposed until the owner confirms them. */
export const proposedHours = {
  status: "Proposed · pending client confirmation",
  season: "Fri, Nov 27 – Thu, Dec 24",
  daily: "Daily, 9 am – 9 pm",
} as const;

export type CatalogStatus = "sample" | "confirmed";

/**
 * The tree varieties, sizes, stock, stands, delivery details and prices below
 * are realistic samples for the owner to review. While `status` is "sample",
 * the site labels them "Sample". Once the owner confirms the real catalog,
 * replace the records, set `status` to "confirmed" (the labels disappear),
 * and trim `unconfirmedDetails`.
 */
export const catalog: { status: CatalogStatus } = { status: "sample" };

export const isSampleCatalog = catalog.status === "sample";

/**
 * Rules behind every price: tree rates per foot (on each tree), flat stand
 * prices (on each stand) and the delivery fee below. `heights` is the span of
 * the price-by-height table; each tree has its own range within it.
 */
export const pricing: PricingRules & {
  heights: { min: number; max: number; step: number; initial: number };
} = {
  heights: { min: 4, max: 10, step: 1, initial: 7 },
  roundTo: 5,
  delivery: { baseFee: 25, includedMiles: 5, perMile: 2.5, maxMiles: 25 },
};

export const imageDisclaimer =
  "Imagery is AI-created seasonal inspiration — not photos of the actual lot or current stock.";

export type NavItem = { href: `#${string}`; label: string; index: string };

export const navigation: readonly NavItem[] = [
  { href: "#trees", label: "Trees", index: "01" },
  { href: "#stands", label: "Stands & delivery", index: "02" },
  { href: "#pricing", label: "Pricing", index: "03" },
  { href: "#gallery", label: "Gallery", index: "04" },
  { href: "#visit", label: "Visit", index: "05" },
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
  selection: {
    src: treeSelectionImage,
    alt: "Illustrative selection of three fresh Christmas tree profiles at a seasonal lot",
  },
  seasonal01: {
    src: treeSeasonal01Image,
    alt: "Illustrative single fresh Christmas tree with a naturally airy, open branch profile",
  },
  seasonal02: {
    src: treeSeasonal02Image,
    alt: "Illustrative single fresh Christmas tree with a classic balanced conical profile",
  },
  seasonal03: {
    src: treeSeasonal03Image,
    alt: "Illustrative single fresh Christmas tree with a lush dense blue-green profile",
  },
  stands: {
    src: treeStandsImage,
    alt: "Illustrative comparison of wooden, metal, and bowl-style Christmas tree stands",
  },
  delivery: {
    src: deliveryImage,
    alt: "Illustrative bundled Christmas tree secured in a dark green pickup truck",
  },
} satisfies Record<string, SiteImage>;

export type TreeProduct = {
  id: string;
  /** The variety, e.g. "Douglas fir". */
  name: string;
  /** Short profile name used in the price table and estimator. */
  shape: string;
  /** Short merchandising label shown on the photo. */
  badge: string;
  profile: string;
  description: string;
  traits: readonly string[];
  /** Heights offered, in feet. */
  sizes: HeightRange;
  /** Price per foot of height; see `pricing` and `treePrice`. */
  ratePerFoot: number;
  availability: string;
  image: SiteImage;
};

/** Sample catalog (see `catalog`), ordered from best value to premium. */
export const treeProducts: readonly TreeProduct[] = [
  {
    id: "douglas-fir",
    name: "Douglas fir",
    shape: "Classic",
    badge: "Best value",
    profile: "Full, balanced cone",
    description:
      "The traditional Christmas tree: a full, balanced cone with soft needles and a sweet, citrusy scent. A great all-rounder for most rooms.",
    traits: ["Sweet citrus scent", "Soft needles", "Full, even shape"],
    sizes: { min: 4, max: 10 },
    ratePerFoot: 14,
    availability: "In stock",
    image: images.seasonal02,
  },
  {
    id: "noble-fir",
    name: "Noble fir",
    shape: "Airy",
    badge: "Ornament favorite",
    profile: "Open, tiered branches",
    description:
      "Layered branches with space between them, strong enough for heavy ornaments and long strands of lights. Blue-green needles that last well indoors.",
    traits: ["Sturdy branches", "Room for ornaments", "Long-lasting needles"],
    sizes: { min: 5, max: 9 },
    ratePerFoot: 20,
    availability: "In stock",
    image: images.seasonal01,
  },
  {
    id: "fraser-fir",
    name: "Fraser fir",
    shape: "Dense",
    badge: "Premium",
    profile: "Lush, dense and full",
    description:
      "A rich, full tree with dark blue-green needles and silvery undersides. One of the best firs for holding its needles all season.",
    traits: ["Excellent needle retention", "Dense and full", "Blue-green color"],
    sizes: { min: 6, max: 8 },
    ratePerFoot: 24,
    availability: "Limited",
    image: images.seasonal03,
  },
];

/** Size filter bands; a tree matches a band when its height range overlaps it. */
export const sizeBands = [
  { value: "4-5", label: "4–5 ft", min: 4, max: 5 },
  { value: "6-8", label: "6–8 ft", min: 6, max: 8 },
  { value: "9-10", label: "9–10 ft", min: 9, max: 10 },
] as const;

export const standProducts = [
  {
    id: "wooden",
    name: "Wooden stand",
    index: "01",
    description:
      "A natural pine cross-brace with a steel cup and a small water dish. Simple and sturdy for smaller trees.",
    maxTreeHeight: 7,
    water: "0.5 gal",
    price: 30,
    availability: "In stock",
  },
  {
    id: "metal",
    name: "Metal stand",
    index: "02",
    description:
      "Powder-coated steel legs with four tightening screws. Holds a mid-size tree firmly upright.",
    maxTreeHeight: 9,
    water: "1 gal",
    price: 45,
    availability: "In stock",
  },
  {
    id: "bowl",
    name: "Bowl-style stand",
    index: "03",
    description:
      "A wide reservoir bowl on a low, stable base. Keeps big trees watered for longer between top-ups.",
    maxTreeHeight: 10,
    water: "1.5 gal",
    price: 55,
    availability: "Limited",
  },
] as const;

/** Delivery fees come from `pricing.delivery`. */
export const deliveryDetails = [
  { label: "Delivery days", value: "Daily during the season" },
  {
    label: "Service area",
    value: "Glendale, Burbank, Los Feliz, Silver Lake, Eagle Rock and nearby",
  },
] as const;

export const galleryImages: readonly (SiteImage & { title: string; category: string })[] = [
  { ...images.hero, title: "An evening at the lot", category: "Tree lot" },
  { ...images.selection, title: "Finding your profile", category: "Trees" },
  { ...images.stands, title: "A steady foundation", category: "Stands" },
  { ...images.delivery, title: "The journey home", category: "Delivery" },
  { ...images.home, title: "The feeling of home", category: "Seasonal display" },
  { ...images.detail, title: "The finishing touch", category: "Decorations" },
];

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

// Spoken caveat for answers built from the sample catalog; empty once confirmed.
const sampleCaveat = isSampleCatalog
  ? ` These are sample details until ${business.owner} confirms this season’s catalog, so please call before relying on them.`
  : "";

// No prices in these answers: they are also published as FAQ structured data.
export const faqs = [
  {
    question: "When does the lot open for the season?",
    answer: `The proposed season runs ${proposedHours.season}, open ${proposedHours.daily.toLowerCase()}. These dates and hours are still awaiting the owner’s confirmation, so call ${business.owner} at ${business.phone.display} before making the trip.`,
  },
  {
    question: "Where is the Christmas tree lot?",
    answer: `The proposed location is ${proposedLocation.address}, pending the owner’s confirmation. Call ${business.owner} to confirm the address and get directions before you visit.`,
  },
  {
    question: "What tree sizes and varieties are available?",
    answer: `The catalog offers ${treeProducts
      .map((tree) => `${tree.name} (${formatHeightRange(tree.sizes)})`)
      .join(
        ", ",
      )}. Stock changes daily, so call with your preferred height to check what is on the lot. The tree planner can help you work out the right height.${sampleCaveat}`,
  },
  {
    question: "Do you sell holiday decorations?",
    answer: `Yes. ${business.name} specializes in fresh Christmas trees and holiday-related decorations. Ask ${business.owner} about this season’s specific items and prices.`,
  },
  {
    question: "Are tree stands available?",
    answer: `Yes: ${standProducts
      .map((stand) => `a ${stand.name.toLowerCase()} for trees up to ${stand.maxTreeHeight} ft`)
      .join(", ")}. Pick a stand rated for your tree’s height.${sampleCaveat}`,
  },
  {
    question: "How are prices worked out?",
    answer: `Trees are priced by height, at a rate per foot for each variety. Stands have one flat price each, and delivery is a base fee plus a charge for each extra mile. The price estimator adds it all up line by line.${sampleCaveat}`,
  },
  {
    question: "Can I reserve a tree or arrange delivery?",
    answer: `Delivery is planned daily during the season, priced by distance from the lot. Online reservations aren’t available, so call ${business.owner} to ask about holding a tree.${sampleCaveat}`,
  },
] as const;

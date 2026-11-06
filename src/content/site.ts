/**
 * Single source of truth for every business fact and piece of copy on the site.
 *
 * Facts marked "unconfirmed" must stay that way until the owner confirms them —
 * never infer an address, hours, prices or stock from the business name or imagery.
 * `llms.txt`, JSON-LD and metadata are all generated from this file.
 */
import type { StaticImageData } from "next/image";

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

export const imageDisclaimer =
  "Imagery is AI-created seasonal inspiration — not photos of the actual lot or current stock.";

export type NavItem = { href: `#${string}`; label: string; index: string };

export const navigation: readonly NavItem[] = [
  { href: "#trees", label: "Trees", index: "01" },
  { href: "#stands", label: "Stands & delivery", index: "02" },
  { href: "#gallery", label: "Gallery", index: "03" },
  { href: "#visit", label: "Visit", index: "04" },
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
  name: string;
  profile: string;
  variety: string;
  sizes: string;
  price: string;
  availability: string;
  description: string;
  image: SiteImage;
  filters: { type: "pending"; size: "pending"; price: "pending" };
};

/**
 * Catalog scaffolding only. Replace these records when the owner confirms
 * varieties, measurements, prices, and live availability.
 */
export const treeProducts: readonly TreeProduct[] = [
  {
    id: "tree-01",
    name: "Seasonal tree 01",
    profile: "Airy profile · illustrative",
    variety: "Variety pending",
    sizes: "Sizes pending",
    price: "Price pending",
    availability: "Call to confirm",
    description:
      "A visual placeholder for a more open branch profile. Final variety and product details require owner approval.",
    image: images.seasonal01,
    filters: { type: "pending", size: "pending", price: "pending" },
  },
  {
    id: "tree-02",
    name: "Seasonal tree 02",
    profile: "Classic profile · illustrative",
    variety: "Variety pending",
    sizes: "Sizes pending",
    price: "Price pending",
    availability: "Call to confirm",
    description:
      "A visual placeholder for a classic full shape. Replace this copy with confirmed variety and care information.",
    image: images.seasonal02,
    filters: { type: "pending", size: "pending", price: "pending" },
  },
  {
    id: "tree-03",
    name: "Seasonal tree 03",
    profile: "Dense profile · illustrative",
    variety: "Variety pending",
    sizes: "Sizes pending",
    price: "Price pending",
    availability: "Call to confirm",
    description:
      "A visual placeholder for a dense branch profile. Current stock, dimensions, and pricing are not yet published.",
    image: images.seasonal03,
    filters: { type: "pending", size: "pending", price: "pending" },
  },
];

export const treeFilters = {
  type: [{ value: "pending", label: "Variety to be confirmed" }],
  size: [{ value: "pending", label: "Size to be confirmed" }],
  price: [{ value: "pending", label: "Price to be confirmed" }],
} as const;

export const standProducts = [
  {
    id: "wooden",
    name: "Wooden stand",
    index: "01",
    description: "Natural cross-brace style listing prepared for confirmed product details.",
    compatibility: "Compatibility pending",
    price: "Price pending",
    availability: "Inventory pending",
  },
  {
    id: "metal",
    name: "Metal stand",
    index: "02",
    description: "Powder-coated frame style listing prepared for confirmed product details.",
    compatibility: "Compatibility pending",
    price: "Price pending",
    availability: "Inventory pending",
  },
  {
    id: "bowl",
    name: "Bowl-style stand",
    index: "03",
    description: "Reservoir-style listing prepared for confirmed capacity and care details.",
    compatibility: "Compatibility pending",
    price: "Price pending",
    availability: "Inventory pending",
  },
] as const;

export const deliveryDetails = [
  { label: "Availability", value: "Pending confirmation" },
  { label: "Service areas", value: "Pending confirmation" },
  { label: "Delivery charge", value: "Pending confirmation" },
  { label: "Mileage fees", value: "No calculation published" },
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
    question: "Are tree stands available?",
    answer: `The catalog is prepared for wooden, metal, and bowl-style stands, but this season’s products, compatibility, prices, and availability are not yet confirmed. Call ${business.owner} before relying on a specific option.`,
  },
  {
    question: "Can I reserve a tree or arrange delivery?",
    answer: `Reservations, delivery areas, charges, mileage rules, and other services are not confirmed on this website. Please call ${business.owner} to discuss your needs before making plans.`,
  },
] as const;

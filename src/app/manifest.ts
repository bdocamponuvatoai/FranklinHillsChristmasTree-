import type { MetadataRoute } from "next";

import { business } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: business.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2e9",
    theme_color: "#15392e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

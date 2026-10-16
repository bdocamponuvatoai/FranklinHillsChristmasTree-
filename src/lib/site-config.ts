const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Canonical origin used for metadata, sitemap and robots. */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (productionHost ? `https://${productionHost}` : "http://localhost:3000"),
);

/**
 * Search indexing is opt-in. Keep it off until the owner has confirmed the
 * address, hours, season dates and services published on the site.
 */
export const isIndexable = process.env.SITE_INDEXING === "enabled";

import { business, imageDisclaimer, unconfirmedDetails } from "@/content/site";

/** Plain-text summary for language models, generated from the same content as the site. */
export function GET() {
  const body = [
    `# ${business.name}`,
    "",
    business.description,
    "",
    `Owner: ${business.owner}`,
    `Telephone: ${business.phone.e164}`,
    "",
    `Unconfirmed: ${unconfirmedDetails.join(", ")}. Contact ${business.owner} for details.`,
    imageDisclaimer,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

# Franklin Hills Christmas Tree Lot

[![CI](https://github.com/bdocamponuvatoai/FranklinHillsChristmasTree-/actions/workflows/ci.yml/badge.svg)](https://github.com/bdocamponuvatoai/FranklinHillsChristmasTree-/actions/workflows/ci.yml)
[![CodeQL](https://github.com/bdocamponuvatoai/FranklinHillsChristmasTree-/actions/workflows/codeql.yml/badge.svg)](https://github.com/bdocamponuvatoai/FranklinHillsChristmasTree-/actions/workflows/codeql.yml)

Seasonal website for Franklin Hills Christmas Tree Lot, built with **Next.js 16** (App Router,
Cache Components), **React 19**, **TypeScript** and **Tailwind CSS v4**. Every route is
prerendered as static content, with no third-party scripts, trackers, cookies or runtime font
requests.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script           | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `npm run dev`    | Local development with Turbopack                |
| `npm run build`  | Production build (all routes static)            |
| `npm start`      | Serve the production build                      |
| `npm run check`  | Typecheck, lint, formatting and unit tests      |
| `npm test`       | Unit tests (Vitest) for the tree-height planner |
| `npm run format` | Format with Prettier (sorts Tailwind classes)   |

Requires Node.js 22.12+ or 24+ (24 recommended; see [`.nvmrc`](.nvmrc)).

## Editing content

**All copy and business facts live in [`src/content/site.ts`](src/content/site.ts).** The page,
JSON-LD structured data, metadata and `/llms.txt` are all generated from it, so they can't drift
apart.

Season dates, hours, address, pricing, varieties, stand inventory, reservations and delivery are
**unconfirmed**. They may appear only as clearly labeled placeholders or proposed information;
never present them as business facts or infer them from the imagery. Once confirmed, remove the
item from `unconfirmedDetails`, update the matching catalog or service record, and revise the FAQ.

**The catalog is sample content** for the owner to review: tree varieties (with height ranges),
stands (with the tallest tree each fits), delivery details and prices. While
`catalog.status` is `"sample"`, the site labels all of it "Sample" and shows a sample notice in
the catalog and pricing sections. When the owner confirms the real catalog, replace the records,
set the status to `"confirmed"` (the labels and notices disappear) and trim `unconfirmedDetails`.
The season and hours (`proposedHours`) and address (`proposedLocation`) are shown as proposed.

**Pricing** follows three rules, all set in `src/content/site.ts`: trees cost height × a rate per
foot (`ratePerFoot` on each tree), rounded to the nearest $5; stands have a flat `price`; delivery
is a base fee plus a charge per extra mile (`pricing.delivery`). The catalog, stands, delivery
section, price table and estimator all calculate from these numbers via `src/lib/pricing.ts`, and
the catalog filters and estimator use each tree's height range via `src/lib/catalog.ts`.

Imagery in `src/assets/images` is AI-generated seasonal inspiration and product scaffolding, not
photos of the lot, inventory, customers, or delivery fleet. The disclaimer is shown on the site;
keep it while those images are in use. The prompts are in
[`docs/asset-prompts.md`](docs/asset-prompts.md).

## Configuration

Copy `.env.example` to `.env.local` (or set these in your host):

| Variable               | Default                                         | Purpose                                    |
| ---------------------- | ----------------------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `VERCEL_PROJECT_PRODUCTION_URL`, else localhost | Canonical URL for metadata, OG and sitemap |
| `SITE_INDEXING`        | `disabled`                                      | Set to `enabled` to allow search engines   |

**Search indexing is off by default.** Pages ship a `noindex` meta tag, an `X-Robots-Tag` header
and a `Disallow: /` robots.txt. Only set `SITE_INDEXING=enabled` after the owner has reviewed the
facts on the site.

## Project structure

```
src/
  app/                 Routes, root layout, metadata files (icons, OG image, robots, sitemap,
                       manifest, llms.txt) and the global design system (globals.css)
  assets/images/       AI-generated source images (served as responsive AVIF/WebP by next/image)
  components/
    layout/            Announcement bar, header, scroll-spy nav, mobile menu, mobile dock, footer
    sections/          One file per homepage section
    planner/           Interactive tree-height planner and its SVG illustration
    pricing/           Price estimator and the "Sample" price label
    ui/                Buttons, links, icons, brand mark
  content/site.ts      Single source of truth for copy and business facts
  lib/                 Planner, pricing and catalog maths (unit tested), site config, helpers
```

## Design and engineering notes

- **Server Components by default.** Only the interactive pieces are client components: the scene
  showcase, tree planner, price estimator, tree catalog filters, gallery lightbox, inquiry form,
  mobile menu, scroll-spy nav and mobile dock.
- **No animation library.** Entrances, parallax, word-by-word ink fill, reading progress and the
  scene autoplay timer all use CSS (including scroll-driven animations). Everything is visible when
  a browser lacks support, and nothing moves for visitors who prefer reduced motion.
- **Works without JavaScript:** anchor navigation, FAQ accordion (native `<details name>`), calls,
  and the full tree catalog (unfiltered). The inquiry form needs JavaScript to build its
  pre-filled text message (`sms:` link); nothing is sent to or stored by the site.
- **Accessibility:** skip link, landmarks, native `<dialog>` menu and gallery lightbox (focus trap,
  Escape, inert page), ARIA tablist with arrow/Home/End keys, a pausable autoplay that stops on interaction,
  debounced screen-reader announcements for the planner, 44px+ touch targets. Audited with axe-core
  at 1440px and 390px with zero violations.
- **Security headers** are set in [`next.config.ts`](next.config.ts): CSP locked to `'self'`, HSTS,
  `X-Frame-Options`, `nosniff`, Referrer-Policy and Permissions-Policy. `'unsafe-inline'` is
  allowed for scripts and styles because Next.js bootstraps statically prerendered pages with
  inline scripts. Nonces would force dynamic rendering.

## Deployment

Deploys to Vercel with zero configuration, or to any Node.js host with `npm run build && npm start`.
Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Contributing and CI

Work on a branch and open a pull request into `main`. Use
[Conventional Commits](https://www.conventionalcommits.org/) for messages (`feat:`, `fix:`,
`chore:`, `ci:`, `docs:`).

GitHub Actions runs on pushes to `main` and on pull requests (CI can also be started by hand). CodeQL also runs weekly, and Dependabot opens update PRs weekly:

| Workflow                               | What it does                                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [CI](.github/workflows/ci.yml)         | `npm ci`, typecheck, lint, format check, unit tests, production build, production `npm audit`                  |
| Dependency review (in CI)              | Blocks pull requests that add dependencies with high-severity advisories                                       |
| [CodeQL](.github/workflows/codeql.yml) | Static security analysis of TypeScript and the workflow files, on PRs into `main`, pushes to `main` and weekly |
| [Dependabot](.github/dependabot.yml)   | Weekly grouped update PRs for npm packages and GitHub Actions                                                  |

Actions are pinned to full commit SHAs, and Dependabot keeps them current. Workflows run with
read-only tokens by default. The Node.js version for CI comes from [`.nvmrc`](.nvmrc).

Vulnerabilities: see [SECURITY.md](SECURITY.md).

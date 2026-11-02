# Matchmaking Resources

Astro site at https://tripleweaving.com: **Thoughts** (essays) and **Papers** (a tagged reading list with PDFs and notes) on matchmaking in multiplayer games. Forked from [astro-erudite](https://github.com/jktrn/astro-erudite) (MIT); its credit stays in `README.md` and `LICENSE`. `README.md` is the public face of the GitHub repo and stays a four-line intro (title, one sentence, site link, credit); developer notes belong in this file.

## Workflow

- Scripts are in `package.json`; dev and preview serve on `http://localhost:4321/`.
- Commit locally. Push only after the user has seen the change on the local preview: every push to `main` deploys to production within about a minute (`.github/workflows/deploy.yml`).
- Git checks files out with CRLF (`core.autocrlf`), so `biome check` flags every file. To check formatting, pipe the file with `\r` stripped through `biome format --stdin-file-path=<file>` and diff.

## Content

- Thoughts live in `src/content/thoughts/<slug>.md`; a folder with `index.md` plus sibling files is a series. Papers live in `src/content/papers/<slug>.md`, citation in frontmatter, the user's notes in the body. Field meanings are in `src/content.config.ts`.
- The filename is the URL slug: lowercase words joined by hyphens (`gatekeep-in-practice.md`). Renaming a published entry needs a matching entry in `redirects` in `astro.config.ts`.
- A thought's `description` is the snippet search results show under the title, and it also appears on the list card: one plain sentence saying what the post is about. An `image` (1200×630) becomes the share preview; without one, links share `public/static/opengraph-image.png`.
- `section` (`matchmaking` | `related`) picks which list an entry appears in. Tags are separate and shared between thoughts and papers.
- A paper's `date` is the date it was added. The matchmaking list sorts by `year`, then by date added.
- Unread papers carry `tbr: true` and `summary: "Read Later"`. Their search description is built from the citation (`paperDescription` in `src/lib/content.ts`). Once the user has written notes on a paper, drop `tbr` and give it a one-sentence `summary`, which then becomes its search snippet.
- PDFs are plain files in `public/pdfs/` (GitHub Pages serves no Git LFS), under about 25 MB, and only ones that may be redistributed; for the rest, set `url` to the source.
- Markdown extras: callouts `:::name[Label]` (names in `src/lib/callout.ts`), LaTeX via Temml, Expressive Code, footnotes rendered as sidenotes, inline SVG diagrams marked `data-diagram` that use the site's colour variables.

## Code conventions

- Internal links go through `withBase()` from `src/lib/url.ts`. `base` is `"/"` today; keeping the helper lets the site move back under a sub-path.
- The site uses Astro's ClientRouter. Every client `<script>` exposes `init(signal)`, registers on `astro:page-load`, and releases window listeners and observers through the `AbortSignal`; `src/components/ScrollToTop.astro` is the pattern.
- Styling is native CSS on custom elements, in astro-erudite's style, with one warm dark theme and no theme switch.
- The look follows enscribe.dev, rebuilt with our own CSS. enscribe.dev's code and its paid MD Lórien font are proprietary: use the MIT template code and Libre Caslon Text (`@fontsource/libre-caslon-text`, imported in `src/layouts/Layout.astro`; font stacks in `src/styles/fonts.css`).

## Search and branding

- Google Search Console (a Domain property) and Bing Webmaster Tools are set up for `tripleweaving.com` under the user's accounts. New pages reach them through the sitemap from `@astrojs/sitemap`; its filter in `astro.config.ts` leaves out subposts, author pages and tag pages, which also carry `noindex`.
- Structured data goes through `src/components/JsonLd.astro`: `WebSite` on the home page (with `tripleweaving` as an alternate name), a scholarly type on paper pages, `BlogPosting` in `MetaPost.astro`.
- The site's mark is three woven strands. The same path is in `src/assets/logo.svg` (sidebar, `currentColor`) and `public/favicon.svg`; the PNG and ICO icons in `public/` are rasterised from `favicon.svg` (sharp is in `node_modules`).
- `public/static/opengraph-image.png` is the default share image and has `SITE.title`, `SITE.description` and the domain baked in, so regenerate it when those change: a 1200×630 HTML page in Libre Caslon on `#11100e`, screenshotted with headless Edge or Chrome.

## Hosting

- GitHub Pages with the custom domain `tripleweaving.com`, set in the repo's Settings → Pages. `site` in `astro.config.ts` must match it.
- DNS is at Cloudflare. Every record is **DNS only**, since Cloudflare's proxy blocks GitHub's HTTPS certificate. The two TXT records verify the domain for GitHub and for Google Search Console; removing either un-verifies it.
- Old `tripleweaving.github.io/matchmaking-resources/...` URLs redirect to the same paths on the domain for as long as the custom domain stays set.

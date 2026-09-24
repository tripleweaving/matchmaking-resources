# Matchmaking Resources

A static site with a blog and a tagged library of papers (with PDFs and notes) on matchmaking in multiplayer games. Built with [Astro](https://astro.build) and Markdown, based on the [astro-erudite](https://github.com/jktrn/astro-erudite) template by enscribe (MIT), and deployed to GitHub Pages.

- **Blog**: Markdown posts with tags, callouts, code blocks and LaTeX (rendered to MathML at build time). Chapters appear as a hover rail in the left column; footnotes (`[^note]`) are shown as sidenotes in the right margin on wide screens.
- **Papers**: two lists, **Matchmaking Papers** (the default when you click Papers) and **Related Papers**, chosen per paper with the `section` field, which is separate from tags. One Markdown file per paper. Frontmatter holds the citation, the body holds your notes. In the list, clicking a title opens the stored PDF in a new tab (or the external source when there is no PDF); a "Notes" link leads to the paper's own page with the embedded PDF and your notes. The list page has a tag selector on the right and a text filter; the selection is kept in the URL so filtered views can be shared.
- **Tags**: shared between posts and papers. `/tags/<tag>` shows both.
- **Dark only**: the site has a single warm dark theme and no theme switch.

## Local development

```bash
npm install
npm run dev
```

The site is served at `http://localhost:4321/matchmaking-resources/` (the trailing path is the GitHub Pages base path, see below).

```bash
npm run build     # type-check and build into dist/
npm run preview   # serve dist/ locally
npm run format    # format with Biome
```

## Adding a blog post

Create `src/content/blog/<slug>.md`:

```markdown
---
title: "How TrueSkill differs from Elo"
description: "One or two sentences shown in lists and search results."
date: 2026-09-20
authors:
  - yanushvy
tags:
  - rating-systems
  - trueskill
---

Body in Markdown. Inline math like $\mu - 3\sigma$ and display math:

$$
E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}
$$
```

Optional fields: `image` (banner, 1200×630), `draft: true` (hidden from the site), `order` (for series). Footnotes use the usual `[^name]` syntax and become sidenotes on wide screens.

What a post can contain is demonstrated in `src/content/blog/formatting-showcase.md`: Expressive Code blocks (`title=`, `{lines}` markers, `collapse=`), inline highlighted code (`` `code{:lang}` ``), LaTeX, callouts written as `:::name[Label]` (`note`, `tip`, `warning`, `caution`, `important`, `definition`, `theorem`, `lemma`, `corollary`, `proof`, `remark`, `notation`, `example`), inline SVG diagrams that use the site's colour variables (add `data-diagram`), tables, footnotes, `<u>`, `<mark>`, `<kbd>`, and raw HTML with an inline `<style>` for one-off blocks. Series work as in astro-erudite: put an `index.md` in a folder and sibling `.md` files become subposts.

Authors live in `src/content/authors/<id>.md`. Edit `yanushvy.md` to set your name, avatar and links.

## Adding a paper

1. Put the PDF in `public/pdfs/`, for example `public/pdfs/trueskill.pdf`. Keep files under about 25 MB and only store PDFs you may redistribute; otherwise link to the source with `url` and omit `pdf`.
2. Create `src/content/papers/<slug>.md`:

```markdown
---
title: "TrueSkill: A Bayesian Skill Rating System"
authors:
  - Ralf Herbrich
  - Tom Minka
  - Thore Graepel
year: 2006
venue: "NeurIPS 2006"          # optional, kept as metadata but not displayed
kind: paper                    # paper | thesis | talk | article | book | report
section: matchmaking           # matchmaking (default) | related: which list it appears in
pdf: "/pdfs/trueskill.pdf"     # optional, path under public/
url: "https://..."             # optional, official source
doi: "10.1145/..."             # optional
tags:
  - trueskill
  - rating-systems
summary: "One paragraph shown on cards and as the page description."
date: 2026-09-01               # date added; newest year, then newest date, sorts first
---

Your notes in Markdown. Headings become the chapter rail on the left.
```

The sample entries in `src/content/papers/` (including `example-with-pdf.md` and `public/pdfs/example.pdf`) can be deleted or replaced.

## Deploying to GitHub Pages

The site is published at https://tripleweaving.github.io/matchmaking-resources/ from the `gh-pages` branch. To publish your latest changes:

```bash
npm run deploy
```

That builds the site and force-pushes `dist/` to `gh-pages`; GitHub serves it within a minute. Commit and push your source to `main` as usual.

`.github/workflows/deploy.yml` (kept locally, not yet in the repository) can replace this with automatic deployment on every push. To enable it, the GitHub CLI token needs the `workflow` scope: run `gh auth refresh -h github.com -s workflow`, then `git add -f .github` and push, and set Settings → Pages → Source to **GitHub Actions**.

If you rename the repository, change `base` in `astro.config.ts` and `REMOTE` in `scripts/deploy.mjs` to match. PDFs are served straight from `public/pdfs/` (do not use Git LFS; Pages does not serve LFS files).

## Project layout

```
src/
  consts.ts              site title, sidebar navigation, social links
  content.config.ts      blog, authors and papers collections (schemas)
  content/
    blog/                posts
    papers/              papers (metadata + notes)
    authors/             author profiles
  components/
    PaperCard.astro      list entry for a paper
    TagSelector.astro    right-hand tag filter on /papers
    TableOfContents.astro chapter rail (left, expands on hover) and mobile bar
    Sidenotes.astro      footnotes rendered in the right margin
  pages/
    papers/              list and detail pages
    blog/, tags/         from astro-erudite, extended for papers
  lib/
    content.ts           getPosts, getPapers, getTags, getPaperTags
    url.ts               base-path helpers (withBase, stripBase)
    base-links.ts        rewrites root-relative Markdown links for the base path
public/
  pdfs/                  paper PDFs
```

## Credits

Template: [astro-erudite](https://github.com/jktrn/astro-erudite) © enscribe, MIT License (see `LICENSE`).

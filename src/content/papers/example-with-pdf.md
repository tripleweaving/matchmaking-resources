---
title: "Example entry with a stored PDF"
authors:
  - Site owner
year: 2026
venue: "Placeholder"
kind: report
pdf: "/pdfs/example.pdf"
section: matchmaking
tags:
  - example
summary: "A placeholder entry showing the embedded PDF viewer and download button. Delete this file once you have added real papers."
date: 2026-09-24
---

This entry exists only to demonstrate the viewer. The PDF at `public/pdfs/example.pdf` is a one-page placeholder.

## How to add your own paper

1. Copy the PDF into `public/pdfs/`, for example `public/pdfs/trueskill.pdf`.
2. Create `src/content/papers/trueskill.md` with the citation metadata in the frontmatter and set `pdf: "/pdfs/trueskill.pdf"`.
3. Write your notes below the frontmatter. Headings become the table of contents on the right, and LaTeX such as $\mu - 3\sigma$ renders as math.

Then delete this file.

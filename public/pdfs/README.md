# PDFs

Drop paper PDFs in this folder and reference them from a paper's frontmatter:

```yaml
pdf: "/pdfs/trueskill.pdf"
```

Guidelines:

- Keep each file under about 25 MB. GitHub rejects files over 100 MB and warns above 50 MB, and GitHub Pages sites should stay under 1 GB in total.
- Do not use Git LFS for these files; GitHub Pages does not serve LFS content.
- Only store PDFs you have the right to redistribute. For everything else, set `url:` to the official source instead and leave `pdf:` out.

`example.pdf` is a one-page placeholder used by the sample entry. Delete it together with `src/content/papers/example-with-pdf.md`.

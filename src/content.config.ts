import { glob } from "astro/loaders"
import { defineCollection, reference } from "astro:content"
import { z } from "astro/zod"

const authors = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/authors",
  }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.url().or(z.string().startsWith("/")),
    bio: z.string().optional(),
    mail: z.email().optional(),
    socials: z.record(z.string(), z.url()).optional(),
  }),
})

const blog = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/blog",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(reference("authors")),
      image: image().optional(),
      draft: z.boolean().optional(),
    }),
})

/**
 * Papers: one Markdown file per paper. The frontmatter holds the citation
 * metadata; the body holds your own notes and is rendered on the detail page
 * (LaTeX works there too). Put PDFs in `public/pdfs/` and reference them as
 * `pdf: "/pdfs/<file>.pdf"`.
 */
const papers = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/papers",
  }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    year: z.number().int(),
    venue: z.string().optional(),
    kind: z
      .enum(["paper", "thesis", "talk", "article", "book", "report"])
      .default("paper"),
    /** Which list the paper belongs to. Not a tag: it picks the page. */
    section: z.enum(["matchmaking", "related"]).default("matchmaking"),
    pdf: z.string().startsWith("/").optional(),
    url: z.url().optional(),
    doi: z.string().optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
})

export const collections = { blog, authors, papers }

import type { SvgComponent } from "astro/types"
import GitHub from "@/assets/icons/github.svg"

export const SITE = {
  title: "Matchmaking Resources",
  description:
    "Notes and papers on matchmaking, rating systems and queue design in multiplayer games.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
} as const

export type NavItem = {
  href: string
  label: string
  children?: { href: string; label: string }[]
}

/**
 * Sidebar navigation. Paths are root-relative; the base path is added when
 * rendered. Children are shown beneath their parent while that section is
 * active.
 */
export const NAVIGATION: NavItem[] = [
  { href: "/blog", label: "Blog" },
  {
    href: "/papers",
    label: "Papers",
    children: [
      { href: "/papers", label: "Matchmaking Papers" },
      { href: "/papers/related", label: "Related Papers" },
    ],
  },
]

export const PAPER_SECTIONS = {
  matchmaking: {
    href: "/papers",
    label: "Matchmaking Papers",
    description:
      "Papers, talks and articles directly about matchmaking in multiplayer games.",
  },
  related: {
    href: "/papers/related",
    label: "Related Papers",
    description:
      "Background reading: rating systems, optimisation and other work that matchmaking builds on.",
  },
} as const

export type PaperSection = keyof typeof PAPER_SECTIONS

export const CONTACT_EMAIL = "tripleweaving@gmail.com"

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  {
    href: "https://github.com/tripleweaving/matchmaking-resources",
    label: "GitHub",
    icon: GitHub,
  },
]

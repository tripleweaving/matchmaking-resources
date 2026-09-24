import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import { satteri } from "@astrojs/markdown-satteri"
import {
  blockExpressiveCode,
  inlineExpressiveCode,
} from "./src/lib/expressive-code"
import { temmlMath } from "./src/lib/math"
import { calloutDirective } from "./src/lib/callout"
import { externalLinks } from "./src/lib/external-links"
import { headingNamespace } from "./src/lib/heading-namespace"
import { headingAnchors } from "./src/lib/heading-anchors"
import { baseLinks } from "./src/lib/base-links"

/**
 * GitHub Pages settings.
 *
 * - Project site (https://<user>.github.io/<repo>/): set `site` to your
 *   GitHub Pages origin and `base` to "/<repo>".
 * - User site (repo named <user>.github.io) or a custom domain: keep `site`
 *   and remove `base`.
 */
const site = "https://tripleweaving.github.io"
const base = "/matchmaking-resources"

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  compressHTML: true,
  prefetch: { prefetchAll: true },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/blog\/[^/]+\/[^/]+\/?$/.test(page) &&
        !/\/authors\/[^/]+\/?$/.test(page) &&
        !page.includes("/tags/"),
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      features: { directive: true, math: true },
      mdastPlugins: [calloutDirective, inlineExpressiveCode, temmlMath],
      hastPlugins: [
        baseLinks(base),
        externalLinks,
        blockExpressiveCode,
        headingNamespace,
        headingAnchors,
      ],
    }),
  },
})

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
import { devFetchDestFix } from "./src/lib/dev-fetch-dest-fix"

/**
 * GitHub Pages settings.
 *
 * - Project site (https://<user>.github.io/<repo>/): set `site` to your
 *   GitHub Pages origin and `base` to "/<repo>".
 * - User site (repo named <user>.github.io) or a custom domain: set `site`
 *   to that origin and `base` to "/". The custom domain itself is set in the
 *   repository's Pages settings.
 */
const site = "https://tripleweaving.com"
const base = "/"

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  compressHTML: true,
  prefetch: { prefetchAll: true },
  vite: { plugins: [devFetchDestFix()] },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/thoughts\/[^/]+\/[^/]+\/?$/.test(page) &&
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

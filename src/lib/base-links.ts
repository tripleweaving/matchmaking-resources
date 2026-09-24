import { defineHastPlugin } from "satteri"

/**
 * Prefix root-relative links and image sources written in Markdown
 * ("/papers/eomm", "/pdfs/x.pdf") with the site's base path so they keep
 * working when the site is served from a sub-path such as GitHub Pages.
 */
export function baseLinks(base: string) {
  const prefix = base.replace(/\/+$/, "")
  const rewrite = (value: unknown) =>
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
      ? `${prefix}${value}`
      : undefined
  return defineHastPlugin({
    name: "base-links",
    element: {
      filter: ["a", "img"],
      visit(node, ctx) {
        if (!prefix) return
        const href = rewrite(node.properties.href)
        if (href) ctx.setProperty(node, "href", href)
        const src = rewrite(node.properties.src)
        if (src) ctx.setProperty(node, "src", src)
      },
    },
  })
}

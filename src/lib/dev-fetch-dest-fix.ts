import type { Connect, Plugin } from "vite"

/** `Sec-Fetch-Dest` values Vite treats as a page load rather than a module. */
const DOCUMENT_DESTINATIONS = new Set([
  "document",
  "iframe",
  "frame",
  "fencedframe",
])

/** `Sec-Fetch-Mode` values a real page load arrives with. */
const NAVIGATE_MODES = new Set(["navigate", "nested-navigate"])

/**
 * Dev server only. Some browser extensions rewrite `Sec-Fetch-Dest` to
 * `document` on every request, including the page's script and style imports.
 * Vite then treats `/@vite/client` and the `/src/...` modules as page loads
 * instead of transforming them, they come back as 404s or with the wrong MIME
 * type, and the page loads without its scripts: sidenotes, the chapter rail
 * and client-side navigation silently stop working. A real page load is
 * always `Sec-Fetch-Mode: navigate`, so when the two disagree, drop the bogus
 * destination before Vite and Astro see the request.
 */
export function devFetchDestFix(): Plugin {
  const fix: Connect.NextHandleFunction = (req, _res, next) => {
    const dest = req.headers["sec-fetch-dest"]
    const mode = req.headers["sec-fetch-mode"]
    if (
      typeof dest === "string" &&
      DOCUMENT_DESTINATIONS.has(dest) &&
      typeof mode === "string" &&
      !NAVIGATE_MODES.has(mode)
    ) {
      delete req.headers["sec-fetch-dest"]
    }
    next()
  }
  return {
    name: "dev-fetch-dest-fix",
    apply: "serve",
    // Astro puts its own middleware at the front of the stack in its post
    // hook; running after it lets this one go in front of all of them.
    enforce: "post",
    configureServer(server) {
      return () => {
        server.middlewares.stack.unshift({ route: "", handle: fix })
      }
    },
  }
}

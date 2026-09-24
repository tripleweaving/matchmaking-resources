/**
 * Base-path helpers for hosting under a sub-path such as
 * https://<user>.github.io/<repo>/. `import.meta.env.BASE_URL` is "/" when no
 * `base` is configured, so every helper is a no-op in that case.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "")

/** Prefix a root-relative path ("/blog/foo") with the configured base. */
export const withBase = (path: string): string =>
  path.startsWith("/") ? `${BASE}${path}` : path

/** Remove the configured base from a pathname so routes can be compared. */
export const stripBase = (pathname: string): string => {
  if (BASE && (pathname === BASE || pathname.startsWith(`${BASE}/`))) {
    return pathname.slice(BASE.length) || "/"
  }
  return pathname
}

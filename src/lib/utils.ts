const ordinal = (day: number) => {
  const mod100 = day % 100
  if (mod100 >= 11 && mod100 <= 13) return `${day}th`
  switch (day % 10) {
    case 1:
      return `${day}st`
    case 2:
      return `${day}nd`
    case 3:
      return `${day}rd`
    default:
      return `${day}th`
  }
}

/** "September 20th, 2026" */
export function formatDate(date: Date): string {
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  }).format(date)
  return `${month} ${ordinal(date.getUTCDate())}, ${date.getUTCFullYear()}`
}

/** Estimated reading time in whole minutes at ~200 words per minute. */
export function readingTime(body: string | undefined): string {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

/** "A, B, C" for up to three authors; "A, B, C et al." beyond that. */
export function formatAuthors(authors: string[], max = 3): string {
  if (authors.length <= max) return authors.join(", ")
  return `${authors.slice(0, max).join(", ")} et al.`
}

export const isSubpost = (id: string) => id.includes("/")

export const subpostSlug = (id: string) => id.split("/")[1]

export const normalizePath = (pathname: string) => {
  try {
    return decodeURIComponent(pathname).replace(/\/+$/, "")
  } catch {
    return pathname.replace(/\/+$/, "")
  }
}

export const hashId = (hash: string) => decodeURIComponent(hash.slice(1))

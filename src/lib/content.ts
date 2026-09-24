import { SITE } from "@/consts"
import { getCollection, type CollectionEntry } from "astro:content"
import { isSubpost } from "@/lib/utils"

export const pageTitle = (title: string) => `${title} | ${SITE.title}`

export async function getPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft)
  return posts
    .filter((post) => !isSubpost(post.id))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export async function getSubposts(): Promise<
  Map<string, CollectionEntry<"blog">[]>
> {
  const posts = await getCollection(
    "blog",
    ({ id, data }) => !data.draft && id.split("/").length === 2,
  )
  posts.sort(
    (a, b) =>
      (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
      a.data.date.getTime() - b.data.date.getTime(),
  )
  return Map.groupBy(posts, (post) => post.id.split("/")[0])
}

type PaperSection = CollectionEntry<"papers">["data"]["section"]

/**
 * Non-draft papers, newest year first, then most recently added. Pass a
 * section to get only that list.
 */
export async function getPapers(
  section?: PaperSection,
): Promise<CollectionEntry<"papers">[]> {
  const papers = await getCollection(
    "papers",
    ({ data }) => !data.draft && (!section || data.section === section),
  )
  return papers.sort(
    (a, b) =>
      b.data.year - a.data.year ||
      b.data.date.getTime() - a.data.date.getTime(),
  )
}

/** Tag → number of papers carrying it, sorted by count then name. */
export async function getPaperTags(
  section?: PaperSection,
): Promise<Map<string, number>> {
  const counts = new Map<string, number>()
  for (const paper of await getPapers(section)) {
    for (const tag of new Set(paper.data.tags ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return new Map(
    [...counts].sort(([a, na], [b, nb]) => nb - na || a.localeCompare(b)),
  )
}

export type Tagged = {
  posts: CollectionEntry<"blog">[]
  papers: CollectionEntry<"papers">[]
}

/**
 * Every tag used by a post (including its subposts) or a paper, mapped to the
 * entries that carry it. Sorted by total count, then alphabetically.
 */
export async function getTags(): Promise<Map<string, Tagged>> {
  const posts = await getPosts()
  const series = await getSubposts()
  const papers = await getPapers()
  const tags = new Map<string, Tagged>()
  const bucket = (tag: string) => {
    let entry = tags.get(tag)
    if (!entry) {
      entry = { posts: [], papers: [] }
      tags.set(tag, entry)
    }
    return entry
  }
  for (const post of posts) {
    const chain = [post, ...(series.get(post.id) ?? [])]
    for (const tag of new Set(
      chain.flatMap((entry) => entry.data.tags ?? []),
    )) {
      bucket(tag).posts.push(post)
    }
  }
  for (const paper of papers) {
    for (const tag of new Set(paper.data.tags ?? [])) {
      bucket(tag).papers.push(paper)
    }
  }
  const size = ({ posts, papers }: Tagged) => posts.length + papers.length
  return new Map(
    [...tags].sort(
      ([a, ta], [b, tb]) => size(tb) - size(ta) || a.localeCompare(b),
    ),
  )
}

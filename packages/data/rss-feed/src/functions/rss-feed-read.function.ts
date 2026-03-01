import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import Parser from 'rss-parser'

export const RssFeedReadInput = z.object({
  url: z.string().describe('URL of the RSS/Atom feed'),
  maxItems: z.number().optional().describe('Maximum number of items to return'),
})

export const RssFeedReadOutput = z.object({
  title: z.string().nullable().describe('Feed title'),
  description: z.string().nullable().describe('Feed description'),
  link: z.string().nullable().describe('Feed link'),
  items: z.array(z.object({
    title: z.string().nullable(),
    link: z.string().nullable(),
    pubDate: z.string().nullable(),
    content: z.string().nullable(),
    contentSnippet: z.string().nullable(),
    creator: z.string().nullable(),
    categories: z.array(z.string()),
    guid: z.string().nullable(),
  })).describe('Feed items'),
})

export const rssFeedRead = pikkuSessionlessFunc({
  description: 'Read and parse an RSS or Atom feed',
  input: RssFeedReadInput,
  output: RssFeedReadOutput,
  node: { displayName: 'RSS Feed Read', category: 'Data', type: 'action' },
  func: async (_services, { url, maxItems }) => {
    const parser = new Parser()
    const feed = await parser.parseURL(url)
    const items = (maxItems ? feed.items.slice(0, maxItems) : feed.items).map((item) => ({
      title: item.title ?? null,
      link: item.link ?? null,
      pubDate: item.pubDate ?? null,
      content: item.content ?? null,
      contentSnippet: item.contentSnippet ?? null,
      creator: item.creator ?? null,
      categories: (item.categories ?? []) as string[],
      guid: item.guid ?? null,
    }))

    return {
      title: feed.title ?? null,
      description: feed.description ?? null,
      link: feed.link ?? null,
      items,
    }
  },
})

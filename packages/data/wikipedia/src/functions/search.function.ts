import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { pageUrl, stripHtml, wikiFetch } from '../wikipedia.js'

export const SearchInput = z.object({
  query: z.string().describe('The text to search Wikipedia for'),
  limit: z
    .number()
    .optional()
    .describe('Maximum number of results to return (default 5)'),
  language: z
    .string()
    .optional()
    .describe('Wikipedia language edition, e.g. "en", "de", "fr" (default "en")'),
})

export const SearchOutput = z.object({
  results: z.array(
    z.object({
      title: z.string(),
      snippet: z.string().describe('Plain-text extract of the matching text'),
      pageId: z.number(),
      url: z.string(),
    })
  ),
})

interface ActionSearchResponse {
  query?: {
    search?: Array<{ title: string; snippet: string; pageid: number }>
  }
}

export const search = pikkuSessionlessFunc({
  description:
    'Search Wikipedia and return matching page titles with plain-text snippets',
  input: SearchInput,
  output: SearchOutput,
  node: { displayName: 'Search Wikipedia', category: 'Search', type: 'action' },
  func: async (_services, { query, limit, language }) => {
    const lang = language ?? 'en'
    const url =
      `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&format=json` +
      `&srlimit=${limit ?? 5}&srsearch=${encodeURIComponent(query)}`
    const body = (await wikiFetch(url)) as ActionSearchResponse
    const results = (body.query?.search ?? []).map((hit) => ({
      title: hit.title,
      snippet: stripHtml(hit.snippet),
      pageId: hit.pageid,
      url: pageUrl(lang, hit.title),
    }))
    return { results }
  },
})

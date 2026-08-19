import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { pageUrl, wikiFetch } from '../wikipedia.js'

export const GetPageInput = z.object({
  title: z.string().describe('The exact Wikipedia page title'),
  language: z
    .string()
    .optional()
    .describe('Wikipedia language edition, e.g. "en", "de", "fr" (default "en")'),
})

export const GetPageOutput = z.object({
  title: z.string(),
  extract: z.string().describe('Full plain-text content of the article'),
  url: z.string(),
})

interface ActionExtractResponse {
  query?: {
    pages?: Record<string, { title?: string; extract?: string }>
  }
}

export const getPage = pikkuSessionlessFunc({
  description:
    'Fetch the full plain-text content of a Wikipedia article by its exact title',
  input: GetPageInput,
  output: GetPageOutput,
  node: { displayName: 'Wikipedia Page', category: 'Knowledge', type: 'action' },
  func: async (_services, { title, language }) => {
    const lang = language ?? 'en'
    const url =
      `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts` +
      `&explaintext=1&redirects=1&titles=${encodeURIComponent(title)}`
    const body = (await wikiFetch(url)) as ActionExtractResponse
    const pages = body.query?.pages ?? {}
    const page = Object.values(pages)[0]
    return {
      title: page?.title ?? title,
      extract: page?.extract ?? '',
      url: pageUrl(lang, page?.title ?? title),
    }
  },
})

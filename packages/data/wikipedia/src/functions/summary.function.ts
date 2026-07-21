import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { pageUrl, wikiFetch } from '../wikipedia.js'

export const SummaryInput = z.object({
  title: z.string().describe('The exact Wikipedia page title'),
  language: z
    .string()
    .optional()
    .describe('Wikipedia language edition, e.g. "en", "de", "fr" (default "en")'),
})

export const SummaryOutput = z.object({
  title: z.string(),
  description: z.string().optional().describe('Short one-line description'),
  extract: z.string().describe('Plain-text summary of the article'),
  url: z.string(),
  thumbnail: z.string().optional().describe('URL of the article thumbnail image'),
})

interface RestSummaryResponse {
  title?: string
  description?: string
  extract?: string
  content_urls?: { desktop?: { page?: string } }
  thumbnail?: { source?: string }
}

export const summary = pikkuSessionlessFunc({
  description:
    'Fetch the plain-text summary of a Wikipedia article by its exact title',
  input: SummaryInput,
  output: SummaryOutput,
  node: { displayName: 'Wikipedia Summary', category: 'Knowledge', type: 'action' },
  func: async (_services, { title, language }) => {
    const lang = language ?? 'en'
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const body = (await wikiFetch(url)) as RestSummaryResponse
    return {
      title: body.title ?? title,
      description: body.description,
      extract: body.extract ?? '',
      url: body.content_urls?.desktop?.page ?? pageUrl(lang, title),
      thumbnail: body.thumbnail?.source,
    }
  },
})

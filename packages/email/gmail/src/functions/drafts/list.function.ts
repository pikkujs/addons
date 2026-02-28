import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DraftListInput = z.object({
  q: z.string().optional(),
  maxResults: z.number().optional().default(10),
  pageToken: z.string().optional(),
  includeSpamTrash: z.boolean().optional().default(false),
})

export const DraftListOutput = z.object({
  drafts: z.array(
    z.object({
      id: z.string(),
      message: z.object({
        id: z.string(),
        threadId: z.string(),
      }),
    })
  ),
  nextPageToken: z.string().optional(),
  resultSizeEstimate: z.number(),
})

export const draftList = pikkuSessionlessFunc({
  description: 'Lists drafts in the mailbox',
  node: { displayName: 'List Drafts', category: 'Drafts', type: 'action' },
  input: DraftListInput,
  output: DraftListOutput,
  func: async ({ gmail }, input) => {
    const qs: Record<string, string | number | boolean | undefined> = {
      maxResults: input.maxResults,
      pageToken: input.pageToken,
      includeSpamTrash: input.includeSpamTrash,
    }

    if (input.q) {
      qs.q = input.q
    }

    const result = await gmail.request<{
      drafts?: { id: string; message: { id: string; threadId: string } }[]
      nextPageToken?: string
      resultSizeEstimate: number
    }>('GET', '/users/me/drafts', { qs })

    return {
      drafts: result.drafts || [],
      nextPageToken: result.nextPageToken,
      resultSizeEstimate: result.resultSizeEstimate || 0,
    }
  },
})

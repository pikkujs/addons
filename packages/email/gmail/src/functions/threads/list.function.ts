import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadListInput = z.object({
  q: z.string().optional(),
  maxResults: z.number().optional().default(10),
  pageToken: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  includeSpamTrash: z.boolean().optional().default(false),
})

export const ThreadListOutput = z.object({
  threads: z.array(
    z.object({
      id: z.string(),
      snippet: z.string().optional(),
      historyId: z.string().optional(),
    })
  ),
  nextPageToken: z.string().optional(),
  resultSizeEstimate: z.number(),
})

export const threadList = pikkuSessionlessFunc({
  description: 'Lists threads in the mailbox',
  node: { displayName: 'List Threads', category: 'Threads', type: 'action' },
  input: ThreadListInput,
  output: ThreadListOutput,
  func: async ({ gmail }, input) => {
    const qs: Record<string, string | number | boolean | undefined> = {
      maxResults: input.maxResults,
      pageToken: input.pageToken,
      includeSpamTrash: input.includeSpamTrash,
    }

    if (input.q) {
      qs.q = input.q
    }

    if (input.labelIds?.length) {
      qs.labelIds = input.labelIds.join(',')
    }

    const result = await gmail.request<{
      threads?: { id: string; snippet?: string; historyId?: string }[]
      nextPageToken?: string
      resultSizeEstimate: number
    }>('GET', '/users/me/threads', { qs })

    return {
      threads: result.threads || [],
      nextPageToken: result.nextPageToken,
      resultSizeEstimate: result.resultSizeEstimate || 0,
    }
  },
})

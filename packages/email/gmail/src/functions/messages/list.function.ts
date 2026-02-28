import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageListInput = z.object({
  q: z.string().optional(),
  maxResults: z.number().optional().default(10),
  pageToken: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  includeSpamTrash: z.boolean().optional().default(false),
})

export const MessageListOutput = z.object({
  messages: z.array(z.object({
    id: z.string(),
    threadId: z.string(),
  })),
  nextPageToken: z.string().optional(),
  resultSizeEstimate: z.number(),
})

export const messageList = pikkuSessionlessFunc({
  description: 'Lists messages in the mailbox',
  node: { displayName: 'List Messages', category: 'Messages', type: 'action' },
  input: MessageListInput,
  output: MessageListOutput,
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
      messages?: { id: string; threadId: string }[]
      nextPageToken?: string
      resultSizeEstimate: number
    }>('GET', '/users/me/messages', { qs })

    return {
      messages: result.messages || [],
      nextPageToken: result.nextPageToken,
      resultSizeEstimate: result.resultSizeEstimate || 0,
    }
  },
})

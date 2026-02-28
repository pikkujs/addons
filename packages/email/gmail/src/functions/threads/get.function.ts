import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadGetInput = z.object({
  id: z.string(),
  format: z.enum(['minimal', 'full', 'raw', 'metadata']).optional().default('full'),
  metadataHeaders: z.array(z.string()).optional(),
})

const HeaderSchema = z.object({
  name: z.string(),
  value: z.string(),
})

const PartSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    partId: z.string().optional(),
    mimeType: z.string().optional(),
    filename: z.string().optional(),
    headers: z.array(HeaderSchema).optional(),
    body: z
      .object({
        attachmentId: z.string().optional(),
        size: z.number().optional(),
        data: z.string().optional(),
      })
      .optional(),
    parts: z.array(PartSchema).optional(),
  })
)

const MessageSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()).optional(),
  snippet: z.string().optional(),
  historyId: z.string().optional(),
  internalDate: z.string().optional(),
  payload: z
    .object({
      partId: z.string().optional(),
      mimeType: z.string().optional(),
      filename: z.string().optional(),
      headers: z.array(HeaderSchema).optional(),
      body: z
        .object({
          attachmentId: z.string().optional(),
          size: z.number().optional(),
          data: z.string().optional(),
        })
        .optional(),
      parts: z.array(PartSchema).optional(),
    })
    .optional(),
  sizeEstimate: z.number().optional(),
  raw: z.string().optional(),
})

export const ThreadGetOutput = z.object({
  id: z.string(),
  historyId: z.string().optional(),
  messages: z.array(MessageSchema),
})

export const threadGet = pikkuSessionlessFunc({
  description: 'Gets a specific thread by ID with all messages',
  node: { displayName: 'Get Thread', category: 'Threads', type: 'action' },
  input: ThreadGetInput,
  output: ThreadGetOutput,
  func: async ({ gmail }, input) => {
    const qs: Record<string, string | undefined> = {
      format: input.format,
    }

    if (input.metadataHeaders?.length) {
      qs.metadataHeaders = input.metadataHeaders.join(',')
    }

    return gmail.request<z.infer<typeof ThreadGetOutput>>(
      'GET',
      `/users/me/threads/${input.id}`,
      { qs }
    )
  },
})

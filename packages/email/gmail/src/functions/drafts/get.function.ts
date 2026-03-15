import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DraftGetInput = z.object({
  id: z.string(),
  format: z.enum(['minimal', 'full', 'raw', 'metadata']).optional().default('full'),
})

export const HeaderSchema = z.object({
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

export const DraftGetOutput = z.object({
  id: z.string(),
  message: z.object({
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
  }),
})

export const draftGet = pikkuSessionlessFunc({
  description: 'Gets a specific draft by ID',
  node: { displayName: 'Get Draft', category: 'Drafts', type: 'action' },
  input: DraftGetInput,
  output: DraftGetOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof DraftGetOutput>>(
      'GET',
      `/users/me/drafts/${input.id}`,
      { qs: { format: input.format } }
    )
  },
})

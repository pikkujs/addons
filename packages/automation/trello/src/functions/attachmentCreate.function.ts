import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AttachmentCreateInput = z.object({
  cardId: z.string(),
  url: z.string().optional(),
  name: z.string().optional(),
  mimeType: z.string().optional(),
})

export const AttachmentCreateOutput = z.record(z.string(), z.unknown())

export const attachmentCreate = pikkuSessionlessFunc({
  description: "Create an attachment",
  input: AttachmentCreateInput,
  output: AttachmentCreateOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/cards/{cardId}/attachments", data) as any
  },
})

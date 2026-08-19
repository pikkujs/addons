import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AttachmentGetInput = z.object({
  cardId: z.string(),
  id: z.string(),
})

export const AttachmentGetOutput = z.record(z.string(), z.unknown())

export const attachmentGet = pikkuSessionlessFunc({
  description: "Get an attachment",
  input: AttachmentGetInput,
  output: AttachmentGetOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/cards/{cardId}/attachments/{id}", data) as any
  },
})

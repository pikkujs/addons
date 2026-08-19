import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AttachmentGetAllInput = z.object({
  cardId: z.string(),
})

export const AttachmentGetAllOutput = z.record(z.string(), z.unknown())

export const attachmentGetAll = pikkuSessionlessFunc({
  description: "Get many attachments",
  input: AttachmentGetAllInput,
  output: AttachmentGetAllOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/cards/{cardId}/attachments", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentDeleteInput = z.object({
  cardId: z.string(),
  id: z.string(),
})

export const AttachmentDeleteOutput = z.record(z.string(), z.unknown())

export const attachmentDelete = pikkuSessionlessFunc({
  description: "Delete an attachment",
  input: AttachmentDeleteInput,
  output: AttachmentDeleteOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/cards/{cardId}/attachments/{id}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentDeleteInput = z.object({
  id: z.string(),
})

export const AttachmentDeleteOutput = z.record(z.string(), z.unknown())

export const attachmentDelete = pikkuSessionlessFunc({
  description: "Delete Attachment",
  input: AttachmentDeleteInput,
  output: AttachmentDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/Attachment/{id}", data) as any
  },
})

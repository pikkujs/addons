import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  parentId: z.string().optional(),
})

export const AttachmentUpdateOutput = z.record(z.string(), z.unknown())

export const attachmentUpdate = pikkuSessionlessFunc({
  description: "Update Attachment",
  input: AttachmentUpdateInput,
  output: AttachmentUpdateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Attachment/{id}", data) as any
  },
})

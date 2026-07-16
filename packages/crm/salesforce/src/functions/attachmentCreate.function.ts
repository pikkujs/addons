import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentCreateInput = z.object({
  name: z.string().optional(),
  parentId: z.string().optional(),
})

export const AttachmentCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const attachmentCreate = pikkuSessionlessFunc({
  description: "Create Attachment",
  input: AttachmentCreateInput,
  output: AttachmentCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Attachment", data) as any
  },
})

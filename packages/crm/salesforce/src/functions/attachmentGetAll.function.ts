import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AttachmentGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const AttachmentGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const attachmentGetAll = pikkuSessionlessFunc({
  description: "Get many Attachment",
  input: AttachmentGetAllInput,
  output: AttachmentGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/Attachment", data) as any
  },
})

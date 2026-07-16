import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const AttachmentGetAllOutput = z.record(z.string(), z.unknown())

export const attachmentGetAll = pikkuSessionlessFunc({
  description: "Get all attachments",
  input: AttachmentGetAllInput,
  output: AttachmentGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/attachment", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentGetInput = z.object({
  id: z.string(),
})

export const AttachmentGetOutput = z.record(z.string(), z.unknown())

export const attachmentGet = pikkuSessionlessFunc({
  description: "Get Attachment",
  input: AttachmentGetInput,
  output: AttachmentGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/Attachment/{id}", data) as any
  },
})

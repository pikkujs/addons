import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AttachmentGetInput = z.object({
  attachmentId: z.string(),
})

export const AttachmentGetOutput = z.record(z.string(), z.unknown())

export const attachmentGet = pikkuSessionlessFunc({
  description: "Get an attachment record",
  input: AttachmentGetInput,
  output: AttachmentGetOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/attachment/{attachmentId}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentDeleteInput = z.object({
  attachmentId: z.string(),
})

export const AttachmentDeleteOutput = z.record(z.string(), z.unknown())

export const attachmentDelete = pikkuSessionlessFunc({
  description: "Delete an attachment",
  input: AttachmentDeleteInput,
  output: AttachmentDeleteOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("DELETE", "/now/attachment/{attachmentId}", data) as any
  },
})

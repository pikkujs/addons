import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AttachmentUploadInput = z.object({
  table_name: z.string().optional(),
  table_sys_id: z.string().optional(),
  file_name: z.string().optional(),
  body: z.string(),
})

export const AttachmentUploadOutput = z.record(z.string(), z.unknown())

export const attachmentUpload = pikkuSessionlessFunc({
  description: "Upload an attachment",
  input: AttachmentUploadInput,
  output: AttachmentUploadOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("POST", "/now/attachment/file", data) as any
  },
})

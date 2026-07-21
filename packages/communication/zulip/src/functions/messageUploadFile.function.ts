import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageUploadFileInput = z.object({
  dataBinaryProperty: z.string().optional(),
})

export const MessageUploadFileOutput = z.record(z.string(), z.unknown())

export const messageUploadFile = pikkuSessionlessFunc({
  description: "Upload a file",
  input: MessageUploadFileInput,
  output: MessageUploadFileOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("POST", "/user_uploads", data) as any
  },
})

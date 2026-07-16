import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileUploadInput = z.object({
  bucket: z.string().optional(),
  key: z.string().optional(),
  body: z.string().optional(),
  acl: z.string().optional(),
})

export const FileUploadOutput = z.record(z.string(), z.unknown())

export const fileUpload = pikkuSessionlessFunc({
  description: "Upload a file",
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("PUT", "/file/upload", data) as any
  },
})

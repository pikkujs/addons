import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileUploadInput = z.object({
  path: z.string().optional(),
  fileContent: z.string().optional(),
})

export const FileUploadOutput = z.record(z.string(), z.unknown())

export const fileUpload = pikkuSessionlessFunc({
  description: "Upload a file",
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("PUT", "/file/upload", data) as any
  },
})

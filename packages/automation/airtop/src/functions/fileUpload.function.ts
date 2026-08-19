import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileUploadInput = z.object({
  fileName: z.string().optional(),
  fileType: z.string().optional(),
})

export const FileUploadOutput = z.record(z.string(), z.unknown())

export const fileUpload = pikkuSessionlessFunc({
  description: "Upload a file",
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/files", data) as any
  },
})

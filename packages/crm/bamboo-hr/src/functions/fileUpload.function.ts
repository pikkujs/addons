import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileUploadInput = z.object({
  fileName: z.string().optional(),
  category: z.string().optional(),
})

export const FileUploadOutput = z.object({
  fileId: z.string().optional(),
})

export const fileUpload = pikkuSessionlessFunc({
  description: "Upload a company file",
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("POST", "/files", data) as any
  },
})

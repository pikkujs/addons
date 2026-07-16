import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileUploadInput = z.object({
  path: z.string().describe("Full path where the file will be uploaded"),
  fileContent: z.string().optional().describe("Text content of the file to upload"),
})

export const FileUploadOutput = z.object({
  success: z.boolean().optional(),
})

export const fileUpload = pikkuSessionlessFunc({
  description: "Upload a file",
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ ftp }, data) => {
    return ftp.call("POST", "/file/upload", data) as any
  },
})

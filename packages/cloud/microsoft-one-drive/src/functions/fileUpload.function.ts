import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileUploadInput = z.object({
  parentId: z.string(),
  fileName: z.string(),
  fileContent: z.string().optional(),
})

export const FileUploadOutput = z.record(z.string(), z.unknown())

export const fileUpload = pikkuSessionlessFunc({
  description: "Upload a file",
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("PUT", "/drive/items/{parentId}/content", data) as any
  },
})

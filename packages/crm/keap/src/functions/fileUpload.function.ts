import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileUploadInput = z.object({
  file_name: z.string().optional(),
  file_data: z.string().optional(),
  is_public: z.boolean().optional(),
  file_association: z.string().optional(),
})

export const FileUploadOutput = z.record(z.string(), z.unknown())

export const fileUpload = pikkuSessionlessFunc({
  description: "Upload a file",
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/files", data) as any
  },
})

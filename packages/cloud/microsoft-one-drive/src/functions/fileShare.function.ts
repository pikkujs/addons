import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileShareInput = z.object({
  fileId: z.string(),
  type: z.string().optional(),
  scope: z.string().optional(),
})

export const FileShareOutput = z.record(z.string(), z.unknown())

export const fileShare = pikkuSessionlessFunc({
  description: "Create a sharing link for a file",
  input: FileShareInput,
  output: FileShareOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("POST", "/drive/items/{fileId}/createLink", data) as any
  },
})

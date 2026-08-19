import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDeleteInput = z.object({
  fileId: z.string(),
})

export const FileDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a file",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("DELETE", "/drive/items/{fileId}", data) as any
  },
})

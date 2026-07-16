import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileDeleteInput = z.object({
  fileId: z.string(),
})

export const FileDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a company file",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("DELETE", "/files/{fileId}", data) as any
  },
})

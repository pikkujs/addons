import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileUpdateInput = z.object({
  fileId: z.string(),
  shareWithEmployee: z.string().optional(),
})

export const FileUpdateOutput = z.object({
  success: z.boolean().optional(),
})

export const fileUpdate = pikkuSessionlessFunc({
  description: "Update a company file",
  input: FileUpdateInput,
  output: FileUpdateOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("POST", "/files/{fileId}", data) as any
  },
})

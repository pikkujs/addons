import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const FileGetAllOutput = z.record(z.string(), z.unknown())

export const fileGetAll = pikkuSessionlessFunc({
  description: "List files",
  input: FileGetAllInput,
  output: FileGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/files", data) as any
  },
})

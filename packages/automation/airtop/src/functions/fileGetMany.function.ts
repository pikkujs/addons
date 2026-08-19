import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileGetManyInput = z.object({
  sessionIds: z.string().optional(),
  limit: z.number().optional(),
})

export const FileGetManyOutput = z.record(z.string(), z.unknown())

export const fileGetMany = pikkuSessionlessFunc({
  description: "Get many files",
  input: FileGetManyInput,
  output: FileGetManyOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("GET", "/files", data) as any
  },
})

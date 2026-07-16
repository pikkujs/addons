import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileGetInput = z.object({
  fileId: z.string(),
})

export const FileGetOutput = z.record(z.string(), z.unknown())

export const fileGet = pikkuSessionlessFunc({
  description: "Get a file",
  input: FileGetInput,
  output: FileGetOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("GET", "/files/{fileId}", data) as any
  },
})

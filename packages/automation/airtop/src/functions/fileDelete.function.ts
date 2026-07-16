import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileDeleteInput = z.object({
  fileId: z.string(),
})

export const FileDeleteOutput = z.record(z.string(), z.unknown())

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a file",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("DELETE", "/files/{fileId}", data) as any
  },
})

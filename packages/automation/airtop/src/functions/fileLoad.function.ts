import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileLoadInput = z.object({
  fileId: z.string(),
  sessionId: z.string().optional(),
})

export const FileLoadOutput = z.record(z.string(), z.unknown())

export const fileLoad = pikkuSessionlessFunc({
  description: "Load a file into a session",
  input: FileLoadInput,
  output: FileLoadOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/files/{fileId}/push", data) as any
  },
})

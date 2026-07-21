import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesDeleteInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `files:write:user`"),
  file: z.string().optional().describe("ID of file to delete."),
})

export const FilesDeleteOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response files.delete method")

export const filesDelete = pikkuSessionlessFunc({
  description: "Deletes a file.",
  input: FilesDeleteInput,
  output: FilesDeleteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/files.delete", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesCommentsDeleteInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `files:write:user`"),
  file: z.string().optional().describe("File to delete a comment from."),
  id: z.string().optional().describe("The comment to delete."),
})

export const FilesCommentsDeleteOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response files.comments.delete method")

export const filesCommentsDelete = pikkuSessionlessFunc({
  description: "Deletes an existing comment on a file.",
  input: FilesCommentsDeleteInput,
  output: FilesCommentsDeleteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/files.comments.delete", data) as any
  },
})

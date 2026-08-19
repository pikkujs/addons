import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesRemoteRemoveInput = z.object({
  external_id: z.string().optional().describe("Creator defined GUID for the file."),
  file: z.string().optional().describe("Specify a file by providing its ID."),
  token: z.string().optional().describe("Authentication token. Requires scope: `remote_files:write`"),
})

export const FilesRemoteRemoveOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const filesRemoteRemove = pikkuSessionlessFunc({
  description: "Remove a remote file.",
  input: FilesRemoteRemoveInput,
  output: FilesRemoteRemoveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/files.remote.remove", data) as any
  },
})

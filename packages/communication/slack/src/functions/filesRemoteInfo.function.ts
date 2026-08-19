import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesRemoteInfoInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `remote_files:read`"),
  file: z.string().optional().describe("Specify a file by providing its ID."),
  external_id: z.string().optional().describe("Creator defined GUID for the file."),
})

export const FilesRemoteInfoOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const filesRemoteInfo = pikkuSessionlessFunc({
  description: "Retrieve information about a remote file added to Slack",
  input: FilesRemoteInfoInput,
  output: FilesRemoteInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/files.remote.info", data) as any
  },
})

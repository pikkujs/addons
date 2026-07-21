import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesRemoteShareInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `remote_files:share`"),
  file: z.string().optional().describe("Specify a file registered with Slack by providing its ID. Either this field or `external_id` or both are required."),
  external_id: z.string().optional().describe("The globally unique identifier (GUID) for the file, as set by the app registering the file with Slack.  Either this field or `file` or both are required."),
  channels: z.string().optional().describe("Comma-separated list of channel IDs where the file will be shared."),
})

export const FilesRemoteShareOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const filesRemoteShare = pikkuSessionlessFunc({
  description: "Share a remote file into a channel.",
  input: FilesRemoteShareInput,
  output: FilesRemoteShareOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/files.remote.share", data) as any
  },
})

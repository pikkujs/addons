import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesRemoteListInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `remote_files:read`"),
  channel: z.string().optional().describe("Filter files appearing in a specific channel, indicated by its ID."),
  ts_from: z.number().optional().describe("Filter files created after this timestamp (inclusive)."),
  ts_to: z.number().optional().describe("Filter files created before this timestamp (inclusive)."),
  limit: z.number().int().optional().describe("The maximum number of items to return."),
  cursor: z.string().optional().describe("Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."),
})

export const FilesRemoteListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const filesRemoteList = pikkuSessionlessFunc({
  description: "Retrieve information about a remote file added to Slack",
  input: FilesRemoteListInput,
  output: FilesRemoteListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/files.remote.list", data) as any
  },
})

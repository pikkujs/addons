import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StarsRemoveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `stars:write`"),
  channel: z.string().optional().describe("Channel to remove star from, or channel where the message to remove star from was posted (used with `timestamp`)."),
  file: z.string().optional().describe("File to remove star from."),
  file_comment: z.string().optional().describe("File comment to remove star from."),
  timestamp: z.string().optional().describe("Timestamp of the message to remove star from."),
})

export const StarsRemoveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from stars.remove method")

export const starsRemove = pikkuSessionlessFunc({
  description: "Removes a star from an item.",
  input: StarsRemoveInput,
  output: StarsRemoveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/stars.remove", data) as any
  },
})

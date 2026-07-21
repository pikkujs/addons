import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StarsAddInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `stars:write`"),
  channel: z.string().optional().describe("Channel to add star to, or channel where the message to add star to was posted (used with `timestamp`)."),
  file: z.string().optional().describe("File to add star to."),
  file_comment: z.string().optional().describe("File comment to add star to."),
  timestamp: z.string().optional().describe("Timestamp of the message to add star to."),
})

export const StarsAddOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from stars.add method")

export const starsAdd = pikkuSessionlessFunc({
  description: "Adds a star to an item.",
  input: StarsAddInput,
  output: StarsAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/stars.add", data) as any
  },
})

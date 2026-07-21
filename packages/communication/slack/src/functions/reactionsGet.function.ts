import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReactionsGetInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `reactions:read`"),
  channel: z.string().optional().describe("Channel where the message to get reactions for was posted."),
  file: z.string().optional().describe("File to get reactions for."),
  file_comment: z.string().optional().describe("File comment to get reactions for."),
  full: z.boolean().optional().describe("If true always return the complete reaction list."),
  timestamp: z.string().optional().describe("Timestamp of the message to get reactions for."),
})

export const ReactionsGetOutput = z.record(z.string(), z.unknown()).describe("Schema for successful response from reactions.get method")

export const reactionsGet = pikkuSessionlessFunc({
  description: "Gets reactions for an item.",
  input: ReactionsGetInput,
  output: ReactionsGetOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/reactions.get", data) as any
  },
})

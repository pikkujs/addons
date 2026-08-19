import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReactionsRemoveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `reactions:write`"),
  channel: z.string().optional().describe("Channel where the message to remove reaction from was posted."),
  file: z.string().optional().describe("File to remove reaction from."),
  file_comment: z.string().optional().describe("File comment to remove reaction from."),
  name: z.string().describe("Reaction (emoji) name."),
  timestamp: z.string().optional().describe("Timestamp of the message to remove reaction from."),
})

export const ReactionsRemoveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from reactions.remove method")

export const reactionsRemove = pikkuSessionlessFunc({
  description: "Removes a reaction from an item.",
  input: ReactionsRemoveInput,
  output: ReactionsRemoveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/reactions.remove", data) as any
  },
})

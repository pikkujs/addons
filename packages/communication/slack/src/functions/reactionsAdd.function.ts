import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReactionsAddInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `reactions:write`"),
  channel: z.string().describe("Channel where the message to add reaction to was posted."),
  name: z.string().describe("Reaction (emoji) name."),
  timestamp: z.string().describe("Timestamp of the message to add reaction to."),
})

export const ReactionsAddOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from reactions.add method")

export const reactionsAdd = pikkuSessionlessFunc({
  description: "Adds a reaction to an item.",
  input: ReactionsAddInput,
  output: ReactionsAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/reactions.add", data) as any
  },
})

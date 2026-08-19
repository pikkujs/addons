import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PinsRemoveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `pins:write`"),
  channel: z.string().describe("Channel where the item is pinned to."),
  timestamp: z.string().optional().describe("Timestamp of the message to un-pin."),
})

export const PinsRemoveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from pins.remove method")

export const pinsRemove = pikkuSessionlessFunc({
  description: "Un-pins an item from a channel.",
  input: PinsRemoveInput,
  output: PinsRemoveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/pins.remove", data) as any
  },
})

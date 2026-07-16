import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PinsAddInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `pins:write`"),
  channel: z.string().describe("Channel to pin the item in."),
  timestamp: z.string().optional().describe("Timestamp of the message to pin."),
})

export const PinsAddOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from pins.add method")

export const pinsAdd = pikkuSessionlessFunc({
  description: "Pins an item to a channel.",
  input: PinsAddInput,
  output: PinsAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/pins.add", data) as any
  },
})

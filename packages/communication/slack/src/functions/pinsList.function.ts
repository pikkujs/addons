import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PinsListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `pins:read`"),
  channel: z.string().describe("Channel to get pinned items for."),
})

export const PinsListOutput = z.unknown().describe("Schema for successful response from pins.list method")

export const pinsList = pikkuSessionlessFunc({
  description: "Lists items pinned to a channel.",
  input: PinsListInput,
  output: PinsListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/pins.list", data) as any
  },
})

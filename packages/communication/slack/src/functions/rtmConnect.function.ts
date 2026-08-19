import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RtmConnectInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `rtm:stream`"),
  batch_presence_aware: z.boolean().optional().describe("Batch presence deliveries via subscription. Enabling changes the shape of `presence_change` events. See [batch presence](/docs/presence-and-status#batching)."),
  presence_sub: z.boolean().optional().describe("Only deliver presence events when requested by subscription. See [presence subscriptions](/docs/presence-and-status#subscriptions)."),
})

export const RtmConnectOutput = z.object({
  ok: z.literal(true),
  self: z.object({
    id: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    name: z.string(),
  }),
  team: z.object({
    domain: z.string(),
    id: z.string().regex(new RegExp("^[T][A-Z0-9]{2,}$")),
    name: z.string(),
  }),
  url: z.string().url(),
}).describe("Schema for successful response from rtm.connect method")

export const rtmConnect = pikkuSessionlessFunc({
  description: "Starts a Real Time Messaging session.",
  input: RtmConnectInput,
  output: RtmConnectOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/rtm.connect", data) as any
  },
})

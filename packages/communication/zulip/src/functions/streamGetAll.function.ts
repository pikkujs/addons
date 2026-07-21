import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StreamGetAllInput = z.object({
  include_public: z.boolean().optional(),
  include_subscribed: z.boolean().optional(),
})

export const StreamGetAllOutput = z.record(z.string(), z.unknown())

export const streamGetAll = pikkuSessionlessFunc({
  description: "Get all streams",
  input: StreamGetAllInput,
  output: StreamGetAllOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("GET", "/streams", data) as any
  },
})

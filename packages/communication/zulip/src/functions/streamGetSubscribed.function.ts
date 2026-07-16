import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StreamGetSubscribedInput = z.object({
  include_subscribers: z.boolean().optional(),
})

export const StreamGetSubscribedOutput = z.record(z.string(), z.unknown())

export const streamGetSubscribed = pikkuSessionlessFunc({
  description: "Get subscribed streams",
  input: StreamGetSubscribedInput,
  output: StreamGetSubscribedOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("GET", "/users/me/subscriptions", data) as any
  },
})

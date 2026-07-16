import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriberGetInput = z.object({
  subscriberId: z.string(),
})

export const SubscriberGetOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const subscriberGet = pikkuSessionlessFunc({
  description: "Get a single subscriber",
  input: SubscriberGetInput,
  output: SubscriberGetOutput,
  func: async ({ mailerLite }, data) => {
    return mailerLite.call("GET", "/subscribers/{subscriberId}", data) as any
  },
})

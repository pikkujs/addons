import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SubscriberUpdateInput = z.object({
  subscriberId: z.string(),
  fields: z.record(z.string(), z.unknown()).optional(),
  status: z.string().optional(),
})

export const SubscriberUpdateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const subscriberUpdate = pikkuSessionlessFunc({
  description: "Update a subscriber",
  input: SubscriberUpdateInput,
  output: SubscriberUpdateOutput,
  func: async ({ mailerLite }, data) => {
    return mailerLite.call("PUT", "/subscribers/{subscriberId}", data) as any
  },
})

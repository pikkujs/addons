import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SubscriberCreateInput = z.object({
  email: z.string().optional(),
  fields: z.record(z.string(), z.unknown()).optional(),
  status: z.string().optional(),
})

export const SubscriberCreateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const subscriberCreate = pikkuSessionlessFunc({
  description: "Create or upsert a subscriber",
  input: SubscriberCreateInput,
  output: SubscriberCreateOutput,
  func: async ({ mailerLite }, data) => {
    return mailerLite.call("POST", "/subscribers", data) as any
  },
})

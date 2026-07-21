import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriberGetAllInput = z.object({
  limit: z.number().int().optional(),
  cursor: z.string().optional(),
  "filter[status]": z.string().optional(),
})

export const SubscriberGetAllOutput = z.object({
  data: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const subscriberGetAll = pikkuSessionlessFunc({
  description: "List subscribers",
  input: SubscriberGetAllInput,
  output: SubscriberGetAllOutput,
  func: async ({ mailerLite }, data) => {
    return mailerLite.call("GET", "/subscribers", data) as any
  },
})

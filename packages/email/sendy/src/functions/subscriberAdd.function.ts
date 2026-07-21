import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriberAddInput = z.object({
  email: z.string().optional(),
  list: z.string().optional(),
  name: z.string().optional(),
  country: z.string().optional(),
})

export const SubscriberAddOutput = z.object({
  success: z.boolean().optional(),
})

export const subscriberAdd = pikkuSessionlessFunc({
  description: "Add a subscriber to a list",
  input: SubscriberAddInput,
  output: SubscriberAddOutput,
  func: async ({ sendy }, data) => {
    return sendy.call("POST", "/subscribe", data) as any
  },
})

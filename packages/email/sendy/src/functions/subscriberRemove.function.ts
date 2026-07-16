import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriberRemoveInput = z.object({
  email: z.string().optional(),
  list: z.string().optional(),
})

export const SubscriberRemoveOutput = z.object({
  success: z.boolean().optional(),
})

export const subscriberRemove = pikkuSessionlessFunc({
  description: "Unsubscribe a user from a list",
  input: SubscriberRemoveInput,
  output: SubscriberRemoveOutput,
  func: async ({ sendy }, data) => {
    return sendy.call("POST", "/unsubscribe", data) as any
  },
})

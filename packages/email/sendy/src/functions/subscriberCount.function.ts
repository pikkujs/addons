import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriberCountInput = z.object({
  list_id: z.string().optional(),
})

export const SubscriberCountOutput = z.object({
  count: z.string().optional(),
})

export const subscriberCount = pikkuSessionlessFunc({
  description: "Count subscribers in a list",
  input: SubscriberCountInput,
  output: SubscriberCountOutput,
  func: async ({ sendy }, data) => {
    return sendy.call("POST", "/api/subscribers/active-subscriber-count.php", data) as any
  },
})

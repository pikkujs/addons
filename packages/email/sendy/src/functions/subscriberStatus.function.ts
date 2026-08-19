import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SubscriberStatusInput = z.object({
  email: z.string().optional(),
  list_id: z.string().optional(),
})

export const SubscriberStatusOutput = z.object({
  status: z.string().optional(),
})

export const subscriberStatus = pikkuSessionlessFunc({
  description: "Get the status of a subscriber",
  input: SubscriberStatusInput,
  output: SubscriberStatusOutput,
  func: async ({ sendy }, data) => {
    return sendy.call("POST", "/api/subscribers/subscription-status.php", data) as any
  },
})

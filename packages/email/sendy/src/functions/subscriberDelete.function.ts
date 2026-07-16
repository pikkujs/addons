import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriberDeleteInput = z.object({
  email: z.string().optional(),
  list_id: z.string().optional(),
})

export const SubscriberDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const subscriberDelete = pikkuSessionlessFunc({
  description: "Delete a subscriber from a list",
  input: SubscriberDeleteInput,
  output: SubscriberDeleteOutput,
  func: async ({ sendy }, data) => {
    return sendy.call("POST", "/api/subscribers/delete.php", data) as any
  },
})

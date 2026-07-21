import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriptionsReadInput = z.object({
  rid: z.string().optional(),
})

export const SubscriptionsReadOutput = z.object({
  success: z.boolean().optional(),
})

export const subscriptionsRead = pikkuSessionlessFunc({
  description: "Mark a subscription as read",
  input: SubscriptionsReadInput,
  output: SubscriptionsReadOutput,
  func: async ({ rocketchat }, data) => {
    return rocketchat.call("POST", "/subscriptions.read", data) as any
  },
})

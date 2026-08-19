import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SubscriptionsGetInput = z.object({
  updatedSince: z.string().optional(),
})

export const SubscriptionsGetOutput = z.object({
  success: z.boolean().optional(),
})

export const subscriptionsGet = pikkuSessionlessFunc({
  description: "Retrieve a list of subscriptions",
  input: SubscriptionsGetInput,
  output: SubscriptionsGetOutput,
  func: async ({ rocketchat }, data) => {
    return rocketchat.call("GET", "/subscriptions.get", data) as any
  },
})

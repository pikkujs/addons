import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormGetSubscriptionsInput = z.object({
  id: z.string(),
  subscriber_state: z.string().optional(),
})

export const FormGetSubscriptionsOutput = z.record(z.string(), z.unknown())

export const formGetSubscriptions = pikkuSessionlessFunc({
  description: "FormGetSubscriptions",
  input: FormGetSubscriptionsInput,
  output: FormGetSubscriptionsOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("GET", "/forms/{id}/subscriptions", data) as any
  },
})

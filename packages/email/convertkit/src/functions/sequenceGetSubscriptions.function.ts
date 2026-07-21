import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SequenceGetSubscriptionsInput = z.object({
  id: z.string(),
  subscriber_state: z.string().optional(),
})

export const SequenceGetSubscriptionsOutput = z.record(z.string(), z.unknown())

export const sequenceGetSubscriptions = pikkuSessionlessFunc({
  description: "SequenceGetSubscriptions",
  input: SequenceGetSubscriptionsInput,
  output: SequenceGetSubscriptionsOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("GET", "/sequences/{id}/subscriptions", data) as any
  },
})

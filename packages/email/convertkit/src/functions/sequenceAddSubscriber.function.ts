import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SequenceAddSubscriberInput = z.object({
  id: z.string(),
  email: z.string().optional(),
  first_name: z.string().optional(),
})

export const SequenceAddSubscriberOutput = z.record(z.string(), z.unknown())

export const sequenceAddSubscriber = pikkuSessionlessFunc({
  description: "SequenceAddSubscriber",
  input: SequenceAddSubscriberInput,
  output: SequenceAddSubscriberOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("POST", "/sequences/{id}/subscribe", data) as any
  },
})

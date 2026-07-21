import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TagSubscriberDeleteInput = z.object({
  id: z.string(),
  email: z.string().optional(),
})

export const TagSubscriberDeleteOutput = z.record(z.string(), z.unknown())

export const tagSubscriberDelete = pikkuSessionlessFunc({
  description: "TagSubscriberDelete",
  input: TagSubscriberDeleteInput,
  output: TagSubscriberDeleteOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("POST", "/tags/{id}/unsubscribe", data) as any
  },
})

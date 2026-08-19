import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TagSubscriberGetAllInput = z.object({
  id: z.string(),
})

export const TagSubscriberGetAllOutput = z.record(z.string(), z.unknown())

export const tagSubscriberGetAll = pikkuSessionlessFunc({
  description: "TagSubscriberGetAll",
  input: TagSubscriberGetAllInput,
  output: TagSubscriberGetAllOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("GET", "/tags/{id}/subscriptions", data) as any
  },
})

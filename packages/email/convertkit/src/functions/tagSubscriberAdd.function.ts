import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TagSubscriberAddInput = z.object({
  id: z.string(),
  email: z.string().optional(),
  first_name: z.string().optional(),
})

export const TagSubscriberAddOutput = z.record(z.string(), z.unknown())

export const tagSubscriberAdd = pikkuSessionlessFunc({
  description: "TagSubscriberAdd",
  input: TagSubscriberAddInput,
  output: TagSubscriberAddOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("POST", "/tags/{id}/subscribe", data) as any
  },
})

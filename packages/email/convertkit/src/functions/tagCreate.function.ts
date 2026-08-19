import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TagCreateInput = z.object({
  name: z.string().optional(),
})

export const TagCreateOutput = z.record(z.string(), z.unknown())

export const tagCreate = pikkuSessionlessFunc({
  description: "TagCreate",
  input: TagCreateInput,
  output: TagCreateOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("POST", "/tags", data) as any
  },
})

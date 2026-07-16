import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LinkUpdateInput = z.object({
  body: z.string().optional(),
})

export const LinkUpdateOutput = z.record(z.string(), z.unknown())

export const linkUpdate = pikkuSessionlessFunc({
  description: "Link update",
  input: LinkUpdateInput,
  output: LinkUpdateOutput,
  func: async ({ bitly }, data) => {
    return bitly.call("POST", "/bitlinks/{id}", data) as any
  },
})

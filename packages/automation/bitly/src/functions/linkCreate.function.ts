import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LinkCreateInput = z.object({
  body: z.string().optional(),
})

export const LinkCreateOutput = z.record(z.string(), z.unknown())

export const linkCreate = pikkuSessionlessFunc({
  description: "Link create",
  input: LinkCreateInput,
  output: LinkCreateOutput,
  func: async ({ bitly }, data) => {
    return bitly.call("POST", "/bitlinks", data) as any
  },
})

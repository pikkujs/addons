import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LinkGetInput = z.object({
  q: z.string().optional(),
})

export const LinkGetOutput = z.record(z.string(), z.unknown())

export const linkGet = pikkuSessionlessFunc({
  description: "Link get",
  input: LinkGetInput,
  output: LinkGetOutput,
  func: async ({ bitly }, data) => {
    return bitly.call("GET", "/bitlinks/{id}", data) as any
  },
})

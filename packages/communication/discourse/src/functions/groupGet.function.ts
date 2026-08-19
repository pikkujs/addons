import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupGetInput = z.object({
  name: z.string(),
})

export const GroupGetOutput = z.record(z.string(), z.unknown())

export const groupGet = pikkuSessionlessFunc({
  description: "Get a group by name",
  input: GroupGetInput,
  output: GroupGetOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("GET", "/groups/{name}", data) as any
  },
})

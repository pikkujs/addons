import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupGetInput = z.object({
  id: z.string(),
})

export const GroupGetOutput = z.record(z.string(), z.unknown())

export const groupGet = pikkuSessionlessFunc({
  description: "Get a group",
  input: GroupGetInput,
  output: GroupGetOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("GET", "/groups/{id}", data) as any
  },
})

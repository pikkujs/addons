import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupUpdateInput = z.object({
  groupId: z.string(),
  name: z.string().optional(),
})

export const GroupUpdateOutput = z.record(z.string(), z.unknown())

export const groupUpdate = pikkuSessionlessFunc({
  description: "Update a group",
  input: GroupUpdateInput,
  output: GroupUpdateOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("PUT", "/groups/{groupId}.json", data) as any
  },
})

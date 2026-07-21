import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCreateInput = z.object({
  name: z.string().optional(),
})

export const GroupCreateOutput = z.record(z.string(), z.unknown())

export const groupCreate = pikkuSessionlessFunc({
  description: "Create a group",
  input: GroupCreateInput,
  output: GroupCreateOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("POST", "/admin/groups.json", data) as any
  },
})

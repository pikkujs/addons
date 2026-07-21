import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCreateInput = z.object({
  name: z.string().optional(),
})

export const GroupCreateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const groupCreate = pikkuSessionlessFunc({
  description: "Create a group",
  input: GroupCreateInput,
  output: GroupCreateOutput,
  func: async ({ mailerLite }, data) => {
    return mailerLite.call("POST", "/groups", data) as any
  },
})

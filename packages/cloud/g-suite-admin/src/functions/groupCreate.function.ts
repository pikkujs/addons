import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCreateInput = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  description: z.string().optional(),
})

export const GroupCreateOutput = z.record(z.string(), z.unknown())

export const groupCreate = pikkuSessionlessFunc({
  description: "Create a group",
  input: GroupCreateInput,
  output: GroupCreateOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("POST", "/directory/v1/groups", data) as any
  },
})

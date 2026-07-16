import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupUpdateInput = z.object({
  groupId: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  description: z.string().optional(),
})

export const GroupUpdateOutput = z.record(z.string(), z.unknown())

export const groupUpdate = pikkuSessionlessFunc({
  description: "Update a group",
  input: GroupUpdateInput,
  output: GroupUpdateOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("PUT", "/directory/v1/groups/{groupId}", data) as any
  },
})

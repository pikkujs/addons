import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupDeleteInput = z.object({
  groupId: z.string(),
})

export const GroupDeleteOutput = z.record(z.string(), z.unknown())

export const groupDelete = pikkuSessionlessFunc({
  description: "Delete a group",
  input: GroupDeleteInput,
  output: GroupDeleteOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("DELETE", "/directory/v1/groups/{groupId}", data) as any
  },
})

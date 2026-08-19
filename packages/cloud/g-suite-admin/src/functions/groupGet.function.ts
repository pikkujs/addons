import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupGetInput = z.object({
  groupId: z.string(),
})

export const GroupGetOutput = z.record(z.string(), z.unknown())

export const groupGet = pikkuSessionlessFunc({
  description: "Get a group",
  input: GroupGetInput,
  output: GroupGetOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("GET", "/directory/v1/groups/{groupId}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupGetAllInput = z.object({
  customer: z.string().optional(),
  domain: z.string().optional(),
  query: z.string().optional(),
  maxResults: z.number().int().optional(),
})

export const GroupGetAllOutput = z.record(z.string(), z.unknown())

export const groupGetAll = pikkuSessionlessFunc({
  description: "List groups",
  input: GroupGetAllInput,
  output: GroupGetAllOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("GET", "/directory/v1/groups", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetAllInput = z.object({
  customer: z.string().optional(),
  domain: z.string().optional(),
  query: z.string().optional(),
  maxResults: z.number().int().optional(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "List users",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("GET", "/directory/v1/users", data) as any
  },
})

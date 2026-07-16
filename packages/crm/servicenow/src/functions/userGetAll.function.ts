import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "Get all users",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/sys_user", data) as any
  },
})

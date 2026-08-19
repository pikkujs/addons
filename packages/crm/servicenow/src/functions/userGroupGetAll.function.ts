import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGroupGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const UserGroupGetAllOutput = z.record(z.string(), z.unknown())

export const userGroupGetAll = pikkuSessionlessFunc({
  description: "Get all user groups",
  input: UserGroupGetAllInput,
  output: UserGroupGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/sys_user_group", data) as any
  },
})

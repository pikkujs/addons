import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserRoleGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const UserRoleGetAllOutput = z.record(z.string(), z.unknown())

export const userRoleGetAll = pikkuSessionlessFunc({
  description: "Get all user roles",
  input: UserRoleGetAllInput,
  output: UserRoleGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/sys_user_role", data) as any
  },
})

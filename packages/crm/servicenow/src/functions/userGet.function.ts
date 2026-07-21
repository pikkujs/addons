import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetInput = z.object({
  userId: z.string(),
  sysparm_fields: z.string().optional(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get a user",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/sys_user/{userId}", data) as any
  },
})

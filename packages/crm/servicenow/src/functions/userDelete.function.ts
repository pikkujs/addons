import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteInput = z.object({
  userId: z.string(),
})

export const UserDeleteOutput = z.record(z.string(), z.unknown())

export const userDelete = pikkuSessionlessFunc({
  description: "Delete a user",
  input: UserDeleteInput,
  output: UserDeleteOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("DELETE", "/now/table/sys_user/{userId}", data) as any
  },
})

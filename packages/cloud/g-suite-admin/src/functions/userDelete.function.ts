import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserDeleteInput = z.object({
  userId: z.string(),
})

export const UserDeleteOutput = z.record(z.string(), z.unknown())

export const userDelete = pikkuSessionlessFunc({
  description: "Delete a user",
  input: UserDeleteInput,
  output: UserDeleteOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("DELETE", "/directory/v1/users/{userId}", data) as any
  },
})

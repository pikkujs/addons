import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteInput = z.object({
  email: z.string(),
})

export const UserDeleteOutput = z.record(z.string(), z.unknown())

export const userDelete = pikkuSessionlessFunc({
  description: "Delete a user by email",
  input: UserDeleteInput,
  output: UserDeleteOutput,
  func: async ({ iterable }, data) => {
    return iterable.call("DELETE", "/users/{email}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInput = z.object({
  userId: z.string(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get a user",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("GET", "/directory/v1/users/{userId}", data) as any
  },
})

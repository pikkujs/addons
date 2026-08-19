import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCreateInput = z.object({
  primaryEmail: z.string().optional(),
  password: z.string().optional(),
  name: z.object({
  givenName: z.string().optional(),
  familyName: z.string().optional(),
}).optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "Create a user",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("POST", "/directory/v1/users", data) as any
  },
})

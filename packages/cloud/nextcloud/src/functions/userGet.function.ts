import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInput = z.object({
  userid: z.string(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get a user",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("GET", "/users/{userid}", data) as any
  },
})

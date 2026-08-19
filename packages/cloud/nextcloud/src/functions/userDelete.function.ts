import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteInput = z.object({
  userid: z.string(),
})

export const UserDeleteOutput = z.record(z.string(), z.unknown())

export const userDelete = pikkuSessionlessFunc({
  description: "Delete a user",
  input: UserDeleteInput,
  output: UserDeleteOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("DELETE", "/users/{userid}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserUpdateInput = z.object({
  userid: z.string(),
  key: z.string().optional(),
  value: z.string().optional(),
})

export const UserUpdateOutput = z.record(z.string(), z.unknown())

export const userUpdate = pikkuSessionlessFunc({
  description: "Update a user",
  input: UserUpdateInput,
  output: UserUpdateOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("PUT", "/users/{userid}", data) as any
  },
})

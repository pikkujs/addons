import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateInput = z.object({
  userId: z.string(),
  full_name: z.string().optional(),
  role: z.number().optional(),
})

export const UserUpdateOutput = z.record(z.string(), z.unknown())

export const userUpdate = pikkuSessionlessFunc({
  description: "Update a user",
  input: UserUpdateInput,
  output: UserUpdateOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("PATCH", "/users/{userId}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateInput = z.object({
  id: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
})

export const UserUpdateOutput = z.record(z.string(), z.unknown())

export const userUpdate = pikkuSessionlessFunc({
  description: "Update a user",
  input: UserUpdateInput,
  output: UserUpdateOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("PUT", "/users/{id}", data) as any
  },
})

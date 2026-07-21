import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserDeleteInput = z.object({
  id: z.string(),
})

export const UserDeleteOutput = z.record(z.string(), z.unknown())

export const userDelete = pikkuSessionlessFunc({
  description: "Delete a user",
  input: UserDeleteInput,
  output: UserDeleteOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("DELETE", "/users/{id}", data) as any
  },
})

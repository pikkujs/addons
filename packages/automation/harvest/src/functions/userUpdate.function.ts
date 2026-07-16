import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserUpdateInput = z.object({
  id: z.string(),
  email: z.string().optional(),
})

export const UserUpdateOutput = z.record(z.string(), z.unknown())

export const userUpdate = pikkuSessionlessFunc({
  description: "User update",
  input: UserUpdateInput,
  output: UserUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/users/{id}", data) as any
  },
})

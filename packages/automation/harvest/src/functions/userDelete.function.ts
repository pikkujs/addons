import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserDeleteInput = z.object({
  id: z.string(),
})

export const UserDeleteOutput = z.record(z.string(), z.unknown())

export const userDelete = pikkuSessionlessFunc({
  description: "User delete",
  input: UserDeleteInput,
  output: UserDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/users/{id}", data) as any
  },
})

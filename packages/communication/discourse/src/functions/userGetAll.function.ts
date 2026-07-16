import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetAllInput = z.object({
  flag: z.string(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "Get all users",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("GET", "/admin/users/list/{flag}.json", data) as any
  },
})

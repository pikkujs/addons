import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetAllInput = z.object({
  query: z.string().optional(),
  limit: z.number().int().optional(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "Get all users",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("GET", "/users/search", data) as any
  },
})

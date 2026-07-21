import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetAllInput = z.object({
  search: z.string().optional(),
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "Get many users",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("GET", "/users", data) as any
  },
})

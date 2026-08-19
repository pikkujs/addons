import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetAllInput = z.object({
  page_number: z.number().optional(),
  page_size: z.number().optional(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "List users",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/users/search", data) as any
  },
})

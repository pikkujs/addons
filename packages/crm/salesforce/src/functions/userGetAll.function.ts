import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const UserGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const userGetAll = pikkuSessionlessFunc({
  description: "Get many User",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/User", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AccountGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const AccountGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const accountGetAll = pikkuSessionlessFunc({
  description: "Get many Account",
  input: AccountGetAllInput,
  output: AccountGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/Account", data) as any
  },
})

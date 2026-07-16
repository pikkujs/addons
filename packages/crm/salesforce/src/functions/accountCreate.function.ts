import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AccountCreateInput = z.object({
  name: z.string().optional(),
})

export const AccountCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const accountCreate = pikkuSessionlessFunc({
  description: "Create Account",
  input: AccountCreateInput,
  output: AccountCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Account", data) as any
  },
})

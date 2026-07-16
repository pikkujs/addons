import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AccountDeleteInput = z.object({
  id: z.string(),
})

export const AccountDeleteOutput = z.record(z.string(), z.unknown())

export const accountDelete = pikkuSessionlessFunc({
  description: "Delete Account",
  input: AccountDeleteInput,
  output: AccountDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/Account/{id}", data) as any
  },
})

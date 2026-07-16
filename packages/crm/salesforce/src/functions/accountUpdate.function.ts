import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AccountUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
})

export const AccountUpdateOutput = z.record(z.string(), z.unknown())

export const accountUpdate = pikkuSessionlessFunc({
  description: "Update Account",
  input: AccountUpdateInput,
  output: AccountUpdateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Account/{id}", data) as any
  },
})

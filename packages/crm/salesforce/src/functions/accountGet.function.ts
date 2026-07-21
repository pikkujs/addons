import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AccountGetInput = z.object({
  id: z.string(),
})

export const AccountGetOutput = z.record(z.string(), z.unknown())

export const accountGet = pikkuSessionlessFunc({
  description: "Get Account",
  input: AccountGetInput,
  output: AccountGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/Account/{id}", data) as any
  },
})

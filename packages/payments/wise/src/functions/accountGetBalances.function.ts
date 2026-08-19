import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AccountGetBalancesInput = z.object({
  profileId: z.string(),
})

export const AccountGetBalancesOutput = z.record(z.string(), z.unknown())

export const accountGetBalances = pikkuSessionlessFunc({
  description: "Get account balances",
  input: AccountGetBalancesInput,
  output: AccountGetBalancesOutput,
  func: async ({ wise }, data) => {
    return wise.call("GET", "/v1/borderless-accounts", data) as any
  },
})

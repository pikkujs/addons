import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AccountGetCurrenciesOutput = z.record(z.string(), z.unknown())

export const accountGetCurrencies = pikkuSessionlessFunc({
  description: "Get available currencies",
  output: AccountGetCurrenciesOutput,
  func: async ({ wise }) => {
    return wise.call("GET", "/v1/borderless-accounts/balance-currencies") as any
  },
})

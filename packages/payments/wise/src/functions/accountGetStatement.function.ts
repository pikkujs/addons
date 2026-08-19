import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AccountGetStatementInput = z.object({
  profileId: z.string(),
  borderlessAccountId: z.string(),
  currency: z.string(),
  intervalStart: z.string().optional(),
  intervalEnd: z.string().optional(),
})

export const AccountGetStatementOutput = z.record(z.string(), z.unknown())

export const accountGetStatement = pikkuSessionlessFunc({
  description: "Get account statement",
  input: AccountGetStatementInput,
  output: AccountGetStatementOutput,
  func: async ({ wise }, data) => {
    return wise.call("GET", "/v3/profiles/{profileId}/borderless-accounts/{borderlessAccountId}/statement.json", data) as any
  },
})

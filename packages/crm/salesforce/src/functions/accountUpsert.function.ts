import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AccountUpsertInput = z.object({
  externalIdField: z.string(),
  externalIdValue: z.string(),
  value: z.string().optional(),
})

export const AccountUpsertOutput = z.record(z.string(), z.unknown())

export const accountUpsert = pikkuSessionlessFunc({
  description: "Create or update Account",
  input: AccountUpsertInput,
  output: AccountUpsertOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Account/{externalIdField}/{externalIdValue}", data) as any
  },
})

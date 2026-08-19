import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomObjectUpsertInput = z.object({
  externalIdField: z.string(),
  externalIdValue: z.string(),
  value: z.string().optional(),
})

export const CustomObjectUpsertOutput = z.record(z.string(), z.unknown())

export const customObjectUpsert = pikkuSessionlessFunc({
  description: "Create or update CustomObject",
  input: CustomObjectUpsertInput,
  output: CustomObjectUpsertOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/CustomObject/{externalIdField}/{externalIdValue}", data) as any
  },
})

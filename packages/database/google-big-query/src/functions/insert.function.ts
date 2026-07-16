import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InsertInput = z.object({
  projectId: z.string(),
  datasetId: z.string(),
  tableId: z.string(),
  skipInvalidRows: z.boolean().optional(),
  ignoreUnknownValues: z.boolean().optional(),
})

export const InsertOutput = z.object({
  kind: z.string().optional(),
})

export const insert = pikkuSessionlessFunc({
  description: "Insert rows in a table",
  input: InsertInput,
  output: InsertOutput,
  func: async ({ googleBigQuery }, data) => {
    return googleBigQuery.call("POST", "/v2/projects/{projectId}/datasets/{datasetId}/tables/{tableId}/insertAll", data) as any
  },
})

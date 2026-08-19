import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataTableBulkAggregateInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  where: z.string().optional().describe("Extra filtering"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  aggregation: z.array(z.record(z.string(), z.unknown())).optional().describe("List of fields to be aggregated").describe("Used for selective aggregation"),
  "xc-password": z.string().optional().describe("Shared view password"),
  body: z.array(z.record(z.string(), z.unknown())),
})

export const PublicDataTableBulkAggregateOutput = z.record(z.string(), z.unknown())

export const publicDataTableBulkAggregate = pikkuSessionlessFunc({
  description: "Read bulk aggregated data from a given table with provided filters",
  input: PublicDataTableBulkAggregateInput,
  output: PublicDataTableBulkAggregateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/public/shared-view/{sharedViewUuid}/bulk/aggregate", data) as any
  },
})

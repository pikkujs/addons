import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataTableAggregateInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  where: z.string().optional().describe("Extra filtering"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  aggregation: z.array(z.record(z.string(), z.unknown())).optional().describe("List of fields to be aggregated").describe("Used for selective aggregation"),
  "xc-password": z.string().optional().describe("Shared view password"),
})

export const PublicDataTableAggregateOutput = z.record(z.string(), z.unknown())

export const publicDataTableAggregate = pikkuSessionlessFunc({
  description: "Read aggregated data from a given table",
  input: PublicDataTableAggregateInput,
  output: PublicDataTableAggregateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/public/shared-view/{sharedViewUuid}/aggregate", data) as any
  },
})

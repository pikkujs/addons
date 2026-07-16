import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableAggregateInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().describe("View ID is required"),
  aggregation: z.array(z.record(z.string(), z.unknown())).optional().describe("List of fields to be aggregated").describe("Used for selective aggregation"),
  where: z.string().optional().describe("Extra filtering"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbDataTableAggregateOutput = z.record(z.string(), z.unknown())

export const dbDataTableAggregate = pikkuSessionlessFunc({
  description: "Read aggregated data from a given table",
  input: DbDataTableAggregateInput,
  output: DbDataTableAggregateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/tables/{tableId}/aggregate", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowCountInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().optional().describe("View ID"),
  fields: z.array(z.unknown()).optional().describe("Which fields to be shown"),
  where: z.string().optional().describe("Extra filtering"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbDataTableRowCountOutput = z.object({
  count: z.number().optional(),
})

export const dbDataTableRowCount = pikkuSessionlessFunc({
  description: "Count of rows in a given table",
  input: DbDataTableRowCountInput,
  output: DbDataTableRowCountOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/tables/{tableId}/records/count", data) as any
  },
})

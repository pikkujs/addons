import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowReadInput = z.object({
  tableId: z.string().describe("Table ID"),
  rowId: z.string().describe("Row ID"),
  viewId: z.string().optional().describe("View ID"),
  fields: z.array(z.unknown()).optional().describe("Which fields to be shown"),
  offset: z.number().int().min(0).optional().describe("Offset in rows"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbDataTableRowReadOutput = z.record(z.string(), z.unknown())

export const dbDataTableRowRead = pikkuSessionlessFunc({
  description: "Get table row in a given table",
  input: DbDataTableRowReadInput,
  output: DbDataTableRowReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/tables/{tableId}/records/{rowId}", data) as any
  },
})

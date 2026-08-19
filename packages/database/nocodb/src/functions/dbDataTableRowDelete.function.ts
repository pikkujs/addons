import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowDeleteInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().optional().describe("View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.union([z.record(z.string(), z.unknown()), z.array(z.record(z.string(), z.unknown()))]),
})

export const DbDataTableRowDeleteOutput = z.unknown()

export const dbDataTableRowDelete = pikkuSessionlessFunc({
  description: "Create a new row in a given table and base.",
  input: DbDataTableRowDeleteInput,
  output: DbDataTableRowDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v2/tables/{tableId}/records", data) as any
  },
})

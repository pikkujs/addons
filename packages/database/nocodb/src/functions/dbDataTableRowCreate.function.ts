import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowCreateInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().optional().describe("View ID"),
  before: z.string().optional(),
  undo: z.string().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.union([z.record(z.string(), z.unknown()), z.array(z.record(z.string(), z.unknown()))]),
})

export const DbDataTableRowCreateOutput = z.unknown()

export const dbDataTableRowCreate = pikkuSessionlessFunc({
  description: "Create a new row in a given table and base.",
  input: DbDataTableRowCreateInput,
  output: DbDataTableRowCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/tables/{tableId}/records", data) as any
  },
})

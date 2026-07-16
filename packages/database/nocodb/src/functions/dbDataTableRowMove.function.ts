import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowMoveInput = z.object({
  tableId: z.string().describe("Table ID"),
  rowId: z.string().describe("Row ID"),
  before: z.string().optional().describe("The row ID before which the row should be moved"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbDataTableRowMoveOutput = z.record(z.string(), z.unknown())

export const dbDataTableRowMove = pikkuSessionlessFunc({
  description: "Move the table row to new position",
  input: DbDataTableRowMoveInput,
  output: DbDataTableRowMoveOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/tables/{tableId}/records/{rowId}/move", data) as any
  },
})

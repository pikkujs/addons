import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableColumnBulkInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  hash: z.string().optional().describe("Columns hash"),
  ops: z.array(z.unknown()).optional(),
})

export const DbTableColumnBulkOutput = z.object({
  failedOps: z.array(z.unknown()).optional(),
})

export const dbTableColumnBulk = pikkuSessionlessFunc({
  description: "Bulk create-update-delete columns",
  input: DbTableColumnBulkInput,
  output: DbTableColumnBulkOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/tables/{tableId}/columns/bulk", data) as any
  },
})

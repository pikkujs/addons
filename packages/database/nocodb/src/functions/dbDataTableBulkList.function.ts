import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableBulkListInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().describe("View ID is required"),
  where: z.string().optional().describe("Extra filtering"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.array(z.record(z.string(), z.unknown())),
})

export const DbDataTableBulkListOutput = z.record(z.string(), z.unknown())

export const dbDataTableBulkList = pikkuSessionlessFunc({
  description: "Read bulk data from a given table with given filters",
  input: DbDataTableBulkListInput,
  output: DbDataTableBulkListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/tables/{tableId}/bulk/dataList", data) as any
  },
})

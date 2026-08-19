import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowBulkUpdateInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.array(z.record(z.string(), z.unknown())).describe("List of data objects"),
})

export const DbTableRowBulkUpdateOutput = z.array(z.number()).describe("List of returned values. 1 means successful. 0 means failed.")

export const dbTableRowBulkUpdate = pikkuSessionlessFunc({
  description: "Bulk Update Table Rows by given IDs",
  input: DbTableRowBulkUpdateInput,
  output: DbTableRowBulkUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowBulkDeleteInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.array(z.record(z.string(), z.unknown())),
})

export const DbTableRowBulkDeleteOutput = z.array(z.number())

export const dbTableRowBulkDelete = pikkuSessionlessFunc({
  description: "Bulk Delete Table Rows by given IDs",
  input: DbTableRowBulkDeleteInput,
  output: DbTableRowBulkDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}", data) as any
  },
})

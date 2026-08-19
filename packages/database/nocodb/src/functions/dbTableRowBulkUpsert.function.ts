import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowBulkUpsertInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.array(z.record(z.string(), z.unknown())).describe("List of data objects"),
})

export const DbTableRowBulkUpsertOutput = z.array(z.unknown()).describe("List of returned values. 1 means successful. 0 means failed.")

export const dbTableRowBulkUpsert = pikkuSessionlessFunc({
  description: "Bulk upsert table rows in one go.",
  input: DbTableRowBulkUpsertInput,
  output: DbTableRowBulkUpsertOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}/upsert", data) as any
  },
})

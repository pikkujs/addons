import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowBulkUpdateAllInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  where: z.string().optional(),
  viewId: z.string().optional(),
  skipPks: z.string().optional().describe("Comma separated list of pks"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const DbTableRowBulkUpdateAllOutput = z.unknown()

export const dbTableRowBulkUpdateAll = pikkuSessionlessFunc({
  description: "Bulk Update all Table Rows if the condition is true",
  input: DbTableRowBulkUpdateAllInput,
  output: DbTableRowBulkUpdateAllOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}/all", data) as any
  },
})

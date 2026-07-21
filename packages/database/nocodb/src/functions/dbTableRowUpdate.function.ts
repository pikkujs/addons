import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowUpdateInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  rowId: z.unknown().describe("Unique Row ID"),
  getHiddenColumn: z.boolean().optional().describe("To get Hidden Columns"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const DbTableRowUpdateOutput = z.record(z.string(), z.unknown())

export const dbTableRowUpdate = pikkuSessionlessFunc({
  description: "Update the Table Row",
  input: DbTableRowUpdateInput,
  output: DbTableRowUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}", data) as any
  },
})

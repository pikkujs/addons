import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowBulkCreateInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  undo: z.string().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  "nc-operation-id": z.string().optional().describe("Operation ID"),
  "nc-import-type": z.string().optional().describe("Import Type if triggering from import"),
  body: z.array(z.record(z.string(), z.unknown())).describe("List of data objects"),
})

export const DbTableRowBulkCreateOutput = z.array(z.object({
  id: z.string().optional(),
})).describe("List of returned IDs")

export const dbTableRowBulkCreate = pikkuSessionlessFunc({
  description: "Bulk insert table rows in one go.",
  input: DbTableRowBulkCreateInput,
  output: DbTableRowBulkCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}", data) as any
  },
})

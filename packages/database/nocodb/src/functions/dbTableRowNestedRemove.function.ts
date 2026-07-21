import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowNestedRemoveInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  rowId: z.unknown().describe("Unique Row ID"),
  relationType: z.enum(["mm", "hm", "bt", "oo", "ln"]),
  columnName: z.string(),
  refRowId: z.string(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableRowNestedRemoveOutput = z.object({
  msg: z.string().optional(),
})

export const dbTableRowNestedRemove = pikkuSessionlessFunc({
  description: "Delete a new nested relations row",
  input: DbTableRowNestedRemoveInput,
  output: DbTableRowNestedRemoveOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}/{relationType}/{columnName}/{refRowId}", data) as any
  },
})

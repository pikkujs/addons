import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowNestedChildrenExcludedListInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  rowId: z.unknown().describe("Unique Row ID"),
  relationType: z.enum(["mm", "hm", "bt", "oo", "ln"]),
  columnName: z.string(),
  limit: z.number().int().min(1).optional(),
  offset: z.number().int().min(0).optional(),
  where: z.string().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableRowNestedChildrenExcludedListOutput = z.unknown()

export const dbTableRowNestedChildrenExcludedList = pikkuSessionlessFunc({
  description: "Get the table rows but exculding the current record's children and parent",
  input: DbTableRowNestedChildrenExcludedListInput,
  output: DbTableRowNestedChildrenExcludedListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}/{relationType}/{columnName}/exclude", data) as any
  },
})

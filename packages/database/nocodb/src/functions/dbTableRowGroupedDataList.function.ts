import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowGroupedDataListInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  columnId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Column ID"),
  fields: z.array(z.unknown()).optional(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  nested: z.unknown().optional().describe("Query params for nested data"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableRowGroupedDataListOutput = z.array(z.unknown())

export const dbTableRowGroupedDataList = pikkuSessionlessFunc({
  description: "Get the grouped data By Column ID. Used in Kanban View.",
  input: DbTableRowGroupedDataListInput,
  output: DbTableRowGroupedDataListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/group/{columnId}", data) as any
  },
})

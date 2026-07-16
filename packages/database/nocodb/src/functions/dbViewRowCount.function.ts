import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DbViewRowCountInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string().describe("View Name"),
  where: z.string().optional(),
  nested: z.unknown().optional().describe("Query params for nested data"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewRowCountOutput = z.object({
  count: z.number().optional(),
})

export const dbViewRowCount = pikkuSessionlessFunc({
  description: "Count how many rows in the given Table View",
  input: DbViewRowCountInput,
  output: DbViewRowCountOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/count", data) as any
  },
})

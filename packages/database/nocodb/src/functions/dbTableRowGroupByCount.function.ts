import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DbTableRowGroupByCountInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  column_name: z.string().optional().describe("Column name of the column you want to group by, eg. `column_name=column1`"),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  offset: z.number().int().min(0).optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableRowGroupByCountOutput = z.unknown()

export const dbTableRowGroupByCount = pikkuSessionlessFunc({
  description: "Get the number of groups by the given query",
  input: DbTableRowGroupByCountInput,
  output: DbTableRowGroupByCountOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/groupby/count", data) as any
  },
})

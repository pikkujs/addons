import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewRowGroupByCountInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string(),
  column_name: z.string().optional().describe("Column name of the column you want to group by, eg. `column_name=column1`"),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  offset: z.number().int().min(0).optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewRowGroupByCountOutput = z.unknown()

export const dbViewRowGroupByCount = pikkuSessionlessFunc({
  description: "Get the table view rows grouped by count the given query",
  input: DbViewRowGroupByCountInput,
  output: DbViewRowGroupByCountOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/groupby/count", data) as any
  },
})

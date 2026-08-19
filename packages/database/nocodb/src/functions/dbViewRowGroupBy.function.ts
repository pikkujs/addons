import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewRowGroupByInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string(),
  column_name: z.string().optional().describe("Column name of the column you want to group by, eg. `column_name=column1`"),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  limit: z.number().int().min(1).optional(),
  offset: z.number().int().min(0).optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewRowGroupByOutput = z.unknown()

export const dbViewRowGroupBy = pikkuSessionlessFunc({
  description: "Get the table view rows grouped by the given query",
  input: DbViewRowGroupByInput,
  output: DbViewRowGroupByOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/groupby", data) as any
  },
})

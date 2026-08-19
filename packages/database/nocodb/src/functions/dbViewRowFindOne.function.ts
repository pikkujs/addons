import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewRowFindOneInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string(),
  fields: z.array(z.unknown()).optional(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  nested: z.unknown().optional().describe("Query params for nested data"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewRowFindOneOutput = z.record(z.string(), z.unknown())

export const dbViewRowFindOne = pikkuSessionlessFunc({
  description: "Return the first result of table view rows with the given query",
  input: DbViewRowFindOneInput,
  output: DbViewRowFindOneOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/find-one", data) as any
  },
})

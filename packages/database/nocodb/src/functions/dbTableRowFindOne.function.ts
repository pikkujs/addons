import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowFindOneInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  fields: z.array(z.unknown()).optional(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableRowFindOneOutput = z.record(z.string(), z.unknown())

export const dbTableRowFindOne = pikkuSessionlessFunc({
  description: "Return the first result of the target Table Row",
  input: DbTableRowFindOneInput,
  output: DbTableRowFindOneOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/find-one", data) as any
  },
})

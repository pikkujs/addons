import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableRowCreateInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  before: z.string().optional(),
  undo: z.boolean().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const DbTableRowCreateOutput = z.unknown()

export const dbTableRowCreate = pikkuSessionlessFunc({
  description: "Create a new row in a given table and base.",
  input: DbTableRowCreateInput,
  output: DbTableRowCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/data/{orgs}/{baseName}/{tableName}", data) as any
  },
})

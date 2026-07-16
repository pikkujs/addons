import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewRowReadInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string().describe("View Name"),
  rowId: z.unknown().describe("Unique Row ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewRowReadOutput = z.record(z.string(), z.unknown())

export const dbViewRowRead = pikkuSessionlessFunc({
  description: "Get the target Table View Row",
  input: DbViewRowReadInput,
  output: DbViewRowReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/{rowId}", data) as any
  },
})

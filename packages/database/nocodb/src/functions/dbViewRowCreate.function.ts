import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewRowCreateInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string(),
  before: z.string().optional(),
  undo: z.string().optional(),
  body: z.record(z.string(), z.unknown()),
})

export const DbViewRowCreateOutput = z.record(z.string(), z.unknown())

export const dbViewRowCreate = pikkuSessionlessFunc({
  description: "Create a new row in the given Table View",
  input: DbViewRowCreateInput,
  output: DbViewRowCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}", data) as any
  },
})

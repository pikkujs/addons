import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewRowListInput = z.object({
  orgs: z.string().describe("Organisation Name. Currently `noco` will be used."),
  baseName: z.string().describe("Base Name"),
  tableName: z.string().describe("Table Name"),
  viewName: z.string(),
  fields: z.array(z.unknown()).optional(),
  sort: z.array(z.unknown()).optional(),
  where: z.string().optional(),
  nested: z.unknown().optional().describe("Query params for nested data"),
  offset: z.number().optional(),
  getHiddenColumns: z.boolean().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewRowListOutput = z.object({
  list: z.array(z.record(z.string(), z.unknown())).describe("List of table view rows"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Paginated Info"),
})

export const dbViewRowList = pikkuSessionlessFunc({
  description: "List all table view rows",
  input: DbViewRowListInput,
  output: DbViewRowListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}", data) as any
  },
})

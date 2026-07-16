import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowNestedListInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().optional().describe("View ID"),
  fields: z.array(z.unknown()).optional().describe("Which fields to be shown"),
  sort: z.union([z.array(z.string()), z.string()]).optional().describe("The result will be sorted based on `sort` query"),
  where: z.string().optional().describe("Extra filtering"),
  offset: z.number().int().min(0).optional().describe("Offset in rows"),
  limit: z.number().int().min(1).optional().describe("Limit in rows"),
  sortArrJson: z.string().optional().describe("Used for multiple sort queries"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbDataTableRowNestedListOutput = z.object({
  list: z.array(z.record(z.string(), z.unknown())).describe("List of data objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Paginated Info"),
})

export const dbDataTableRowNestedList = pikkuSessionlessFunc({
  description: "Linked rows in a given Links/LinkToAnotherRecord column",
  input: DbDataTableRowNestedListInput,
  output: DbDataTableRowNestedListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/tables/{tableId}/links/{columnId}/records/{rowId}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataNestedListInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  rowId: z.unknown().describe("Unique Row ID"),
  relationType: z.enum(["mm", "hm", "bt", "oo", "ln"]).describe("Relation Type"),
  columnName: z.string().describe("Column Name"),
  fields: z.array(z.unknown()).optional().describe("Which fields to be shown"),
  sort: z.union([z.array(z.string()), z.string()]).optional().describe("The result will be sorted based on `sort` query"),
  where: z.string().optional().describe("Extra filtering"),
  offset: z.number().int().min(0).optional().describe("Offset in rows"),
  limit: z.number().int().min(1).optional().describe("Limit in rows"),
  sortArrJson: z.string().optional().describe("Used for multiple sort queries"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
})

export const PublicDataNestedListOutput = z.object({
  list: z.array(z.record(z.string(), z.unknown())).describe("List of data objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Paginated info"),
})

export const publicDataNestedList = pikkuSessionlessFunc({
  description: "List all nested list data in a given shared view",
  input: PublicDataNestedListInput,
  output: PublicDataNestedListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/public/shared-view/{sharedViewUuid}/rows/{rowId}/{relationType}/{columnName}", data) as any
  },
})

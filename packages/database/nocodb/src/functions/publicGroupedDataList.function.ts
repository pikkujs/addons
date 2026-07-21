import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const PublicGroupedDataListInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  columnId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Column ID"),
  fields: z.array(z.unknown()).optional().describe("Which fields to be shown"),
  sort: z.union([z.array(z.string()), z.string()]).optional().describe("The result will be sorted based on `sort` query"),
  where: z.string().optional().describe("Extra filtering"),
  offset: z.number().int().min(0).optional().describe("Offset in rows"),
  limit: z.number().int().min(1).optional().describe("Limit in rows"),
  sortArrJson: z.string().optional().describe("Used for multiple sort queries"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  "xc-password": z.string().optional().describe("Shared view password"),
})

export const PublicGroupedDataListOutput = z.array(z.object({
  key: z.string().describe("The Grouped Key"),
  value: z.object({
    list: z.array(z.record(z.string(), z.unknown())).describe("List of the target data"),
    pageInfo: z.object({
      isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
      isLastPage: z.boolean().optional().describe("Is the current page the last page"),
      page: z.number().optional().describe("The current page"),
      offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
      pageSize: z.number().optional().describe("The number of pages"),
      totalRows: z.number().optional().describe("The number of rows in the given result"),
    }).describe("Paginated Info"),
  }).describe("the paginated result of the given key"),
}))

export const publicGroupedDataList = pikkuSessionlessFunc({
  description: "List Shared View Grouped Data",
  input: PublicGroupedDataListInput,
  output: PublicGroupedDataListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/public/shared-view/{sharedViewUuid}/group/{columnId}", data) as any
  },
})

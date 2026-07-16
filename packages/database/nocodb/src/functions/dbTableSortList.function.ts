import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableSortListInput = z.object({
  viewId: z.string().describe("Unique View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableSortListOutput = z.object({
  list: z.array(z.object({
    id: z.string().min(0).max(20).optional().describe("Unique ID"),
    fk_column_id: z.string().min(0).max(20).optional().describe("Model for ID"),
    fk_model_id: z.string().min(0).max(20).optional().describe("Model for ID"),
    source_id: z.string().optional().describe("Source ID"),
    direction: z.enum(["asc", "desc", "count-desc", "count-asc"]).optional().describe("Sort direction"),
    order: z.number().optional(),
    base_id: z.string().optional().describe("Base ID"),
    fk_level_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to List View Level"),
  })).describe("List of Sort Objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Model for Paginated"),
}).describe("Model for Sort List")

export const dbTableSortList = pikkuSessionlessFunc({
  description: "List all the sort data in a given View",
  input: DbTableSortListInput,
  output: DbTableSortListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/views/{viewId}/sorts", data) as any
  },
})

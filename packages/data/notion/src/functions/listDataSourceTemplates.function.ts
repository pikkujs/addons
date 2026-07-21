// Data sources — Data source endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const ListDataSourceTemplatesInput = z.object({
  data_source_id: z.string().describe("ID of a Notion data source."),
  name: z.string().optional().describe("Filter templates by name (case-insensitive substring match)."),
  start_cursor: z.string().optional().describe("If supplied, this endpoint will return a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results."),
  page_size: z.number().int().min(1).max(100).optional().describe("The number of items from the full list desired in the response. Maximum: 100"),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const ListDataSourceTemplatesOutput = z.object({
  templates: z.array(z.object({
    id: z.string().uuid().describe("ID of the template page."),
    name: z.string().describe("Name of the template."),
    is_default: z.boolean().describe("Whether this template is the default template for the data source."),
  })).max(100).describe("Array of templates available in this data source."),
  has_more: z.boolean().describe("Whether there are more templates available beyond this page."),
  next_cursor: z.union([z.string().uuid(), z.unknown()]).describe("Cursor to use for the next page of results. Null if there are no more results."),
})

export const listDataSourceTemplates = pikkuSessionlessFunc({
  description: "List templates in a data source",
  input: ListDataSourceTemplatesInput,
  output: ListDataSourceTemplatesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/data_sources/{data_source_id}/templates", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableSortGetInput = z.object({
  sortId: z.string().describe("Unique Sort ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableSortGetOutput = z.object({
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  fk_column_id: z.string().min(0).max(20).optional().describe("Model for ID"),
  fk_model_id: z.string().min(0).max(20).optional().describe("Model for ID"),
  source_id: z.string().optional().describe("Source ID"),
  direction: z.enum(["asc", "desc", "count-desc", "count-asc"]).optional().describe("Sort direction"),
  order: z.number().optional(),
  base_id: z.string().optional().describe("Base ID"),
  fk_level_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to List View Level"),
}).describe("Model for Sort")

export const dbTableSortGet = pikkuSessionlessFunc({
  description: "Get the sort data by Sort ID",
  input: DbTableSortGetInput,
  output: DbTableSortGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/sorts/{sortId}", data) as any
  },
})

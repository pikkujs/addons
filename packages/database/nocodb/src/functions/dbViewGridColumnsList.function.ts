import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewGridColumnsListInput = z.object({
  gridId: z.string().describe("Grid View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewGridColumnsListOutput = z.array(z.object({
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  fk_view_id: z.string().min(0).max(20).optional().describe("Foreign Key to View"),
  fk_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
  base_id: z.string().min(0).max(20).optional().describe("Base ID"),
  source_id: z.string().min(0).max(20).optional().describe("Source ID"),
  show: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
  order: z.number().optional().describe("Grid Column Order"),
  width: z.string().optional().describe("Column Width"),
  help: z.union([z.string(), z.unknown()]).optional().describe("Column Help Text"),
  group_by: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Group By"),
  group_by_order: z.number().optional().describe("Group By Order"),
  group_by_sort: z.union([z.string(), z.unknown()]).optional().describe("Group By Sort"),
  aggregation: z.union([z.string(), z.unknown()]).optional().describe("Aggregation Type"),
}))

export const dbViewGridColumnsList = pikkuSessionlessFunc({
  description: "List all columns in the given Grid",
  input: DbViewGridColumnsListInput,
  output: DbViewGridColumnsListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/grids/{gridId}/grid-columns", data) as any
  },
})

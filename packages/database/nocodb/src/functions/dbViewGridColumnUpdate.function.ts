import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewGridColumnUpdateInput = z.object({
  columnId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Column ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  fk_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
  help: z.string().max(255).optional(),
  label: z.string().max(255).optional().describe("The label of the column"),
  width: z.string().max(255).regex(new RegExp("^[0-9]+(px|%)$")).optional().describe("The width of the column"),
  group_by: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Group By"),
  group_by_order: z.number().optional().describe("Group By Order"),
  group_by_sort: z.union([z.string(), z.unknown()]).optional().describe("Group By Sort"),
  aggregation: z.union([z.string(), z.unknown()]).optional().describe("Aggregation"),
})

export const DbViewGridColumnUpdateOutput = z.number()

export const dbViewGridColumnUpdate = pikkuSessionlessFunc({
  description: "Update grid column(s) in the given Grid",
  input: DbViewGridColumnUpdateInput,
  output: DbViewGridColumnUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/grid-columns/{columnId}", data) as any
  },
})

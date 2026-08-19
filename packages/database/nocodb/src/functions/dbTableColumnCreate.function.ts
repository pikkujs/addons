import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableColumnCreateInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.object({
  column_name: z.string().optional(),
  description: z.union([z.string(), z.unknown()]).optional().describe("Model for TextOrNull"),
  column_order: z.object({
    order: z.number().optional(),
    view_id: z.string().optional(),
  }).optional().describe("Column order in a specific view"),
  title: z.string().min(1).max(255),
  view_id: z.string().optional(),
}).describe("Model for Column Request"),
})

export const dbTableColumnCreate = pikkuSessionlessFunc({
  description: "Create a new column in a given Table",
  input: DbTableColumnCreateInput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/tables/{tableId}/columns", data)
  },
})

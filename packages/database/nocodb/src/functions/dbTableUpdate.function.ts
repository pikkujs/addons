import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableUpdateInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  table_name: z.string().optional().describe("Table name"),
  title: z.string().optional().describe("Table title"),
  description: z.union([z.string(), z.unknown()]).optional().describe("Table description"),
  base_id: z.string().optional().describe("Base ID"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Model for Meta"),
})

export const DbTableUpdateOutput = z.object({
  msg: z.string().optional(),
})

export const dbTableUpdate = pikkuSessionlessFunc({
  description: "Update the table meta data by the given table ID",
  input: DbTableUpdateInput,
  output: DbTableUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/tables/{tableId}", data) as any
  },
})

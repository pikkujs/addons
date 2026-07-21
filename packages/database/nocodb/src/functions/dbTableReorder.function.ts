import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableReorderInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  order: z.number().optional(),
})

export const DbTableReorderOutput = z.boolean()

export const dbTableReorder = pikkuSessionlessFunc({
  description: "Update the order of the given Table",
  input: DbTableReorderInput,
  output: DbTableReorderOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/tables/{tableId}/reorder", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewColumnUpdateInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID"),
  columnId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Column ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  show: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("View Title"),
  order: z.number().min(0).optional().describe("The order of the list of views."),
})

export const DbViewColumnUpdateOutput = z.number()

export const dbViewColumnUpdate = pikkuSessionlessFunc({
  description: "Update a column in a View",
  input: DbViewColumnUpdateInput,
  output: DbViewColumnUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/views/{viewId}/columns/{columnId}", data) as any
  },
})

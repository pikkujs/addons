import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewShowAllColumnInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  ignoreIds: z.array(z.unknown()).optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewShowAllColumnOutput = z.boolean()

export const dbViewShowAllColumn = pikkuSessionlessFunc({
  description: "Show All Columns in a given View",
  input: DbViewShowAllColumnInput,
  output: DbViewShowAllColumnOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/views/{viewId}/show-all", data) as any
  },
})

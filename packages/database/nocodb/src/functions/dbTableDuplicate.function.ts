import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableDuplicateInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  options: z.object({
  excludeData: z.boolean().optional(),
  excludeViews: z.boolean().optional(),
  excludeHooks: z.boolean().optional(),
  title: z.string().optional().describe("New table title"),
}).optional(),
})

export const DbTableDuplicateOutput = z.object({
  name: z.string().optional(),
  id: z.string().optional(),
})

export const dbTableDuplicate = pikkuSessionlessFunc({
  description: "Duplicate a table",
  input: DbTableDuplicateInput,
  output: DbTableDuplicateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/duplicate/{baseId}/table/{tableId}", data) as any
  },
})

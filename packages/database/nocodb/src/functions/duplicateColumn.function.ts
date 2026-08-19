import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DuplicateColumnInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  columnId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Column ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  options: z.object({
  excludeData: z.boolean().optional(),
}).optional(),
  extra: z.record(z.string(), z.unknown()).optional(),
})

export const DuplicateColumnOutput = z.object({
  name: z.string().optional(),
  id: z.string().optional(),
})

export const duplicateColumn = pikkuSessionlessFunc({
  description: "Duplicate a column",
  input: DuplicateColumnInput,
  output: DuplicateColumnOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/duplicate/{baseId}/column/{columnId}", data) as any
  },
})

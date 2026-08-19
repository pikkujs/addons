import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const BaseUpdateInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  color: z.string().max(50).optional().describe("Primary Theme Color"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Base Meta"),
  title: z.string().min(1).max(128).optional().describe("Base Title"),
  status: z.union([z.string(), z.unknown()]).optional().describe("Base Status"),
  order: z.number().min(0).optional().describe("The order of the list of projects."),
})

export const BaseUpdateOutput = z.number()

export const baseUpdate = pikkuSessionlessFunc({
  description: "Update the given base",
  input: BaseUpdateInput,
  output: BaseUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/projects/{baseId}", data) as any
  },
})

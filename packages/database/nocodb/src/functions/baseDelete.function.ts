import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const BaseDeleteInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const BaseDeleteOutput = z.boolean()

export const baseDelete = pikkuSessionlessFunc({
  description: "Delete the given base",
  input: BaseDeleteInput,
  output: BaseDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/projects/{baseId}", data) as any
  },
})

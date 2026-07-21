import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const BaseModelVisibilityListInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  includeM2M: z.boolean().optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const BaseModelVisibilityListOutput = z.array(z.unknown())

export const baseModelVisibilityList = pikkuSessionlessFunc({
  description: "Hide / show views based on user role",
  input: BaseModelVisibilityListInput,
  output: BaseModelVisibilityListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/projects/{baseId}/visibility-rules", data) as any
  },
})

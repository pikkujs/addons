import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const ApiTokenCreateInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  description: z.string().max(255).optional().describe("Description of the API token"),
})

export const ApiTokenCreateOutput = z.object({
  id: z.string().min(0).max(20).optional().describe("Unique API Token ID"),
  fk_user_id: z.string().min(0).max(20).optional().describe("Foreign Key to User"),
  description: z.string().optional().describe("API Token Description"),
  token: z.string().optional().describe("API Token"),
}).describe("Model for API Token")

export const apiTokenCreate = pikkuSessionlessFunc({
  description: "Create API Token in a base",
  input: ApiTokenCreateInput,
  output: ApiTokenCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/api-tokens", data) as any
  },
})

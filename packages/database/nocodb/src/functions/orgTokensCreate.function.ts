import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const OrgTokensCreateInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  description: z.string().max(255).optional().describe("Description of the API token"),
})

export const OrgTokensCreateOutput = z.object({
  id: z.string().min(0).max(20).optional().describe("Unique API Token ID"),
  fk_user_id: z.string().min(0).max(20).optional().describe("Foreign Key to User"),
  description: z.string().optional().describe("API Token Description"),
  token: z.string().optional().describe("API Token"),
}).describe("Model for API Token")

export const orgTokensCreate = pikkuSessionlessFunc({
  description: "Creat an organisation API token. Access with API tokens will be blocked.",
  input: OrgTokensCreateInput,
  output: OrgTokensCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/tokens", data) as any
  },
})

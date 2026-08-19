import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const OrgTokensDeleteInput = z.object({
  tokenId: z.string().describe("API Token ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const OrgTokensDeleteOutput = z.number()

export const orgTokensDelete = pikkuSessionlessFunc({
  description: "Delete an organisation API token. Access with API tokens will be blocked.",
  input: OrgTokensDeleteInput,
  output: OrgTokensDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/tokens/{tokenId}", data) as any
  },
})

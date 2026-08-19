import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PublicSharedBaseGetInput = z.object({
  sharedBaseUuid: z.string().describe("Shared Base UUID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const PublicSharedBaseGetOutput = z.object({
  base_id: z.string().optional().describe("Base ID"),
})

export const publicSharedBaseGet = pikkuSessionlessFunc({
  description: "Get Share Source Meta",
  input: PublicSharedBaseGetInput,
  output: PublicSharedBaseGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/public/shared-base/{sharedBaseUuid}/meta", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsCacheDeleteInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const UtilsCacheDeleteOutput = z.boolean()

export const utilsCacheDelete = pikkuSessionlessFunc({
  description: "Delete All K/V pairs in NocoCache",
  input: UtilsCacheDeleteInput,
  output: UtilsCacheDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/cache", data) as any
  },
})

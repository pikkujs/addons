import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsAppVersionInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const UtilsAppVersionOutput = z.object({
  currentVersion: z.string().optional().describe("Current NocoDB Version"),
  releaseVersion: z.string().optional().describe("Latest Release Version"),
})

export const utilsAppVersion = pikkuSessionlessFunc({
  description: "Get the application version",
  input: UtilsAppVersionInput,
  output: UtilsAppVersionOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/version", data) as any
  },
})

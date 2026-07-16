import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const OrgLicenseGetInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const OrgLicenseGetOutput = z.object({
  key: z.string().optional().describe("Application license key"),
})

export const orgLicenseGet = pikkuSessionlessFunc({
  description: "Get the application license key. Exclusive for super admin.",
  input: OrgLicenseGetInput,
  output: OrgLicenseGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/license", data) as any
  },
})

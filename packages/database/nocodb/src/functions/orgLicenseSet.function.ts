import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const OrgLicenseSetInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  key: z.string().max(255).optional().describe("The license key"),
})

export const OrgLicenseSetOutput = z.object({
  msg: z.string().optional(),
})

export const orgLicenseSet = pikkuSessionlessFunc({
  description: "Set the application license key. Exclusive for super admin.",
  input: OrgLicenseSetInput,
  output: OrgLicenseSetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/license", data) as any
  },
})

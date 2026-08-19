import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const OrgAppSettingsGetInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const OrgAppSettingsGetOutput = z.object({
  invite_only_signup: z.boolean().optional().describe("Status of invite only signup"),
})

export const orgAppSettingsGet = pikkuSessionlessFunc({
  description: "Get the application settings. Exclusive for super admin.",
  input: OrgAppSettingsGetInput,
  output: OrgAppSettingsGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/app-settings", data) as any
  },
})

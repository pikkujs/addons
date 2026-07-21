import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const OrgUsersAddInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  email: z.string().email().optional(),
  roles: z.enum(["org-level-creator", "org-level-viewer"]).optional().describe("Roles for the base user"),
})

export const OrgUsersAddOutput = z.object({
  invite_token: z.string().optional().describe("Invite Token"),
  email: z.string().optional().describe("User email"),
})

export const orgUsersAdd = pikkuSessionlessFunc({
  description: "Create an organisation user. Exclusive for Super Admin. Access with API Tokens will be blocked.",
  input: OrgUsersAddInput,
  output: OrgUsersAddOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/users", data) as any
  },
})

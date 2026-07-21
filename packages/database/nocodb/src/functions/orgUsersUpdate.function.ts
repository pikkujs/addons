import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const OrgUsersUpdateInput = z.object({
  userId: z.string().min(0).max(20).describe("Model for ID").describe("Unique User ID"),
  email: z.string().email().optional(),
  roles: z.enum(["org-level-creator", "org-level-viewer"]).optional().describe("Roles for the base user"),
})

export const OrgUsersUpdateOutput = z.object({
  msg: z.string().optional(),
})

export const orgUsersUpdate = pikkuSessionlessFunc({
  description: "Update an organisation user by User ID. Exclusive for Super Admin. Access with API Tokens will be blocked.",
  input: OrgUsersUpdateInput,
  output: OrgUsersUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/users/{userId}", data) as any
  },
})

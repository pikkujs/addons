import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const OrgUsersDeleteInput = z.object({
  userId: z.string().min(0).max(20).describe("Model for ID").describe("Unique User ID"),
})

export const OrgUsersDeleteOutput = z.object({
  msg: z.string().optional().describe("Sucess Message"),
})

export const orgUsersDelete = pikkuSessionlessFunc({
  description: "Delete an organisation user by User ID. Exclusive for Super Admin. Access with API Tokens will be blocked.",
  input: OrgUsersDeleteInput,
  output: OrgUsersDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/users/{userId}", data) as any
  },
})

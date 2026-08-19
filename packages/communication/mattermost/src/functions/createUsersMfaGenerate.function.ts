// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateUsersMfaGenerateInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const CreateUsersMfaGenerateOutput = z.object({
  secret: z.string().optional().describe("The MFA secret as a string"),
  qr_code: z.string().optional().describe("A base64 encoded QR code image"),
})

export const createUsersMfaGenerate = pikkuSessionlessFunc({
  description: "Generates an multi-factor authentication secret for a user and returns it as a string and as base64 encoded QR code image.\n##### Permissions\nMust be logged in as the user or have the `edit_other_users` permission.",
  input: CreateUsersMfaGenerateInput,
  output: CreateUsersMfaGenerateOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/{user_id}/mfa/generate", data) as any
  },
})

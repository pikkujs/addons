// OAuth — OAuth endpoints (basic authentication)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '@pikku/core/errors'

export const RevokeTokenInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  token: z.string(),
})

export const RevokeTokenOutput = z.object({
  request_id: z.string().uuid().optional(),
})

export const revokeToken = pikkuSessionlessFunc({
  description: "Revoke a token",
  input: RevokeTokenInput,
  output: RevokeTokenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/oauth/revoke", data) as any
  },
})

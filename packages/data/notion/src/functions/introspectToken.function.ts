// OAuth — OAuth endpoints (basic authentication)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '@pikku/core/errors'

export const IntrospectTokenInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  token: z.string(),
})

export const IntrospectTokenOutput = z.object({
  active: z.boolean(),
  scope: z.string().optional(),
  iat: z.number().int().optional(),
  request_id: z.string().uuid().optional(),
})

export const introspectToken = pikkuSessionlessFunc({
  description: "Introspect a token",
  input: IntrospectTokenInput,
  output: IntrospectTokenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/oauth/introspect", data) as any
  },
})

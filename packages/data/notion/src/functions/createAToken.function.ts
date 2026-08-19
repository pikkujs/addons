// OAuth — OAuth endpoints (basic authentication)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '@pikku/core/errors'

export const CreateATokenInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  body: z.union([z.object({
  grant_type: z.string(),
  code: z.string(),
  redirect_uri: z.string().optional(),
  external_account: z.object({
    key: z.string(),
    name: z.string(),
  }).optional(),
}), z.object({
  grant_type: z.string(),
  refresh_token: z.string(),
})]),
})

export const CreateATokenOutput = z.object({
  access_token: z.string(),
  token_type: z.string(),
  refresh_token: z.unknown(),
  bot_id: z.string().uuid(),
  workspace_icon: z.unknown(),
  workspace_name: z.unknown(),
  workspace_id: z.string().uuid(),
  owner: z.union([z.object({
    type: z.string(),
    user: z.union([z.object({
      type: z.string(),
      person: z.object({
        email: z.string(),
        email_verified: z.boolean().optional(),
      }),
      name: z.unknown(),
      avatar_url: z.unknown(),
      id: z.string(),
      object: z.string(),
    }), z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    })]),
  }), z.object({
    type: z.string(),
    workspace: z.boolean(),
  })]),
  duplicated_template_id: z.unknown(),
  request_id: z.string().uuid().optional(),
})

export const createAToken = pikkuSessionlessFunc({
  description: "Exchange an authorization code for an access and refresh token",
  input: CreateATokenInput,
  output: CreateATokenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/oauth/token", data) as any
  },
})

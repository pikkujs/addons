// Users — User endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const GetSelfInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const GetSelfOutput = z.object({
  id: z.string().uuid().describe("The ID of the user."),
  object: z.string().describe("The user object type name."),
  name: z.union([z.string(), z.unknown()]).describe("The name of the user."),
  avatar_url: z.union([z.string(), z.unknown()]).describe("The avatar URL of the user."),
})

export const getSelf = pikkuSessionlessFunc({
  description: "Retrieve your token's bot user",
  input: GetSelfInput,
  output: GetSelfOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/users/me", data) as any
  },
})

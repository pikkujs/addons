// Users — User endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const GetUsersInput = z.object({
  start_cursor: z.string().optional(),
  page_size: z.number().optional(),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const GetUsersOutput = z.object({
  type: z.string(),
  user: z.record(z.string(), z.unknown()),
  object: z.string(),
  next_cursor: z.unknown(),
  has_more: z.boolean(),
  results: z.array(z.object({
    id: z.string().uuid().describe("The ID of the user."),
    object: z.string().describe("The user object type name."),
    name: z.union([z.string(), z.unknown()]).describe("The name of the user."),
    avatar_url: z.union([z.string(), z.unknown()]).describe("The avatar URL of the user."),
  })),
})

export const getUsers = pikkuSessionlessFunc({
  description: "List all users",
  input: GetUsersInput,
  output: GetUsersOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/users", data) as any
  },
})

// Custom emojis — Custom emoji endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const ListCustomEmojisInput = z.object({
  start_cursor: z.string().optional().describe("If supplied, this endpoint will return a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results."),
  page_size: z.number().int().min(1).max(100).optional().describe("The number of items from the full list desired in the response. Maximum: 100"),
  name: z.string().optional().describe("If supplied, filters custom emojis by exact name match. Useful for resolving a custom emoji name to its ID."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const ListCustomEmojisOutput = z.object({
  object: z.string().describe("Always `list`"),
  type: z.string().describe("Always `custom_emoji`"),
  results: z.array(z.object({
    id: z.string().uuid().describe("The ID of the custom emoji."),
    name: z.string().describe("The name of the custom emoji."),
    url: z.string().describe("The URL of the custom emoji."),
  })).max(100).describe("The list of custom emojis."),
  has_more: z.boolean().describe("Whether there are more results available."),
  next_cursor: z.union([z.string().uuid(), z.unknown()]).describe("The cursor to use for the next page of results, or null if there are no more results."),
})

export const listCustomEmojis = pikkuSessionlessFunc({
  description: "List custom emojis",
  input: ListCustomEmojisInput,
  output: ListCustomEmojisOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/custom_emojis", data) as any
  },
})

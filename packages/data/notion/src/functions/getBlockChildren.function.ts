// Blocks — Block endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const GetBlockChildrenInput = z.object({
  block_id: z.string(),
  start_cursor: z.string().uuid().optional(),
  page_size: z.number().optional(),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const GetBlockChildrenOutput = z.any()

export const getBlockChildren = pikkuSessionlessFunc({
  description: "Retrieve block children",
  input: GetBlockChildrenInput,
  output: GetBlockChildrenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/blocks/{block_id}/children", data) as any
  },
})

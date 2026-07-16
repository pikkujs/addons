// Blocks — Block endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const RetrieveABlockInput = z.object({
  block_id: z.string(),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const RetrieveABlockOutput = z.any()

export const retrieveABlock = pikkuSessionlessFunc({
  description: "Retrieve a block",
  input: RetrieveABlockInput,
  output: RetrieveABlockOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/blocks/{block_id}", data) as any
  },
})

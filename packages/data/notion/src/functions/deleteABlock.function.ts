// Blocks — Block endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const DeleteABlockInput = z.object({
  block_id: z.string(),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const DeleteABlockOutput = z.any()

export const deleteABlock = pikkuSessionlessFunc({
  description: "Delete a block",
  input: DeleteABlockInput,
  output: DeleteABlockOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("DELETE", "/v1/blocks/{block_id}", data) as any
  },
})

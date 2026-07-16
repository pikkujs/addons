// Blocks — Block endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const UpdateABlockInput = z.any()

export const UpdateABlockOutput = z.any()

export const updateABlock = pikkuSessionlessFunc({
  description: "Update a block",
  input: UpdateABlockInput,
  output: UpdateABlockOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("PATCH", "/v1/blocks/{block_id}", data) as any
  },
})

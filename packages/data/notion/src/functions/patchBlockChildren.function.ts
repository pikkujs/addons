// Blocks — Block endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const PatchBlockChildrenInput = z.any()

export const PatchBlockChildrenOutput = z.any()

export const patchBlockChildren = pikkuSessionlessFunc({
  description: "Append block children",
  input: PatchBlockChildrenInput,
  output: PatchBlockChildrenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("PATCH", "/v1/blocks/{block_id}/children", data) as any
  },
})

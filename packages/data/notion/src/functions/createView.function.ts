// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

const viewSortRequestSchema = z.record(z.string(), z.unknown()).describe("Sort for the view. Can be a property sort (with property and direction) or timestamp sort (with timestamp and direction).")

export const CreateViewInput = z.any()

export const CreateViewOutput = z.any()

export const createView = pikkuSessionlessFunc({
  description: "Create a view",
  input: CreateViewInput,
  output: CreateViewOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/views", data) as any
  },
})

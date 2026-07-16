// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

const viewPropertySortRequestSchema = z.object({
  property: z.string().describe("Property name or ID to sort by."),
  direction: z.enum(["ascending", "descending"]).describe("Sort direction."),
})

export const UpdateAViewInput = z.any()

export const UpdateAViewOutput = z.any()

export const updateAView = pikkuSessionlessFunc({
  description: "Update a view",
  input: UpdateAViewInput,
  output: UpdateAViewOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("PATCH", "/v1/views/{view_id}", data) as any
  },
})

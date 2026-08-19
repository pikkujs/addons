// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const RetrieveAViewInput = z.object({
  view_id: z.string().describe("ID of a Notion view."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const RetrieveAViewOutput = z.any()

export const retrieveAView = pikkuSessionlessFunc({
  description: "Retrieve a view",
  input: RetrieveAViewInput,
  output: RetrieveAViewOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/views/{view_id}", data) as any
  },
})

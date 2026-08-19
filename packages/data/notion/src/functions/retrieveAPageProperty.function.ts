// Pages — Page endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const RetrieveAPagePropertyInput = z.object({
  page_id: z.string(),
  property_id: z.string(),
  start_cursor: z.string().optional(),
  page_size: z.number().int().optional(),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const RetrieveAPagePropertyOutput = z.any()

export const retrieveAPageProperty = pikkuSessionlessFunc({
  description: "Retrieve a page property item",
  input: RetrieveAPagePropertyInput,
  output: RetrieveAPagePropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/pages/{page_id}/properties/{property_id}", data) as any
  },
})

// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const DeleteViewQueryInput = z.object({
  view_id: z.string().describe("The ID of the view."),
  query_id: z.string().describe("The ID of the query."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const DeleteViewQueryOutput = z.object({
  object: z.string().describe("The object type."),
  id: z.string().uuid().describe("The ID of the deleted view query."),
  deleted: z.boolean().describe("Whether the view query was deleted."),
})

export const deleteViewQuery = pikkuSessionlessFunc({
  description: "Delete a view query",
  input: DeleteViewQueryInput,
  output: DeleteViewQueryOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("DELETE", "/v1/views/{view_id}/queries/{query_id}", data) as any
  },
})

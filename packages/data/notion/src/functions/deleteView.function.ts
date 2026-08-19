// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const DeleteViewInput = z.object({
  view_id: z.string().describe("The ID of the view to delete."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const DeleteViewOutput = z.object({
  object: z.string().describe("The object type name."),
  id: z.string().uuid().describe("The ID of the view."),
  parent: z.object({
    type: z.string().describe("The parent type."),
    database_id: z.string().uuid().describe("The ID of the parent database."),
  }).describe("The parent database of the view."),
  type: z.enum(["table", "board", "list", "calendar", "timeline", "gallery", "form", "chart", "map", "dashboard"]).describe("The view type."),
})

export const deleteView = pikkuSessionlessFunc({
  description: "Delete a view",
  input: DeleteViewInput,
  output: DeleteViewOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("DELETE", "/v1/views/{view_id}", data) as any
  },
})

// Pages — Page endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const UpdatePageMarkdownInput = z.object({
  page_id: z.string().describe("The ID of the page to update."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  body: z.object({
  allow_async: z.boolean().optional().describe("Set to true to opt into receiving an async_task result when this update operation is accepted for background execution. If omitted or false, the endpoint keeps the existing synchronous response shape."),
}),
})

export const UpdatePageMarkdownOutput = z.object({
  object: z.string().describe("The type of object, always 'page_markdown'."),
  id: z.string().uuid().describe("The ID of the page or block."),
  markdown: z.string().describe("The page content rendered as enhanced Markdown."),
  truncated: z.boolean().describe("Whether the content was truncated due to exceeding the record count limit."),
  unknown_block_ids: z.array(z.string().uuid()).max(100).describe("Block IDs that could not be loaded (appeared as <unknown> tags in the markdown). Pass these IDs back to this endpoint to fetch their content separately."),
})

export const updatePageMarkdown = pikkuSessionlessFunc({
  description: "Update a page's content as markdown",
  input: UpdatePageMarkdownInput,
  output: UpdatePageMarkdownOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("PATCH", "/v1/pages/{page_id}/markdown", data) as any
  },
})

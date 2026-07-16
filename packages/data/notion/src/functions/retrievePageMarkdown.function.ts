// Pages — Page endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const RetrievePageMarkdownInput = z.object({
  page_id: z.string().describe("The ID of the page (or block) to retrieve as markdown. Non-navigable block IDs from truncated responses can be passed here to fetch their subtrees."),
  include_transcript: z.boolean().optional().describe("Whether to include meeting note transcripts. Defaults to false. When true, full transcripts are included; when false, a placeholder with the meeting note URL is shown instead."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const RetrievePageMarkdownOutput = z.object({
  object: z.string().describe("The type of object, always 'page_markdown'."),
  id: z.string().uuid().describe("The ID of the page or block."),
  markdown: z.string().describe("The page content rendered as enhanced Markdown."),
  truncated: z.boolean().describe("Whether the content was truncated due to exceeding the record count limit."),
  unknown_block_ids: z.array(z.string().uuid()).max(100).describe("Block IDs that could not be loaded (appeared as <unknown> tags in the markdown). Pass these IDs back to this endpoint to fetch their content separately."),
})

export const retrievePageMarkdown = pikkuSessionlessFunc({
  description: "Retrieve a page as markdown",
  input: RetrievePageMarkdownInput,
  output: RetrievePageMarkdownOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/pages/{page_id}/markdown", data) as any
  },
})

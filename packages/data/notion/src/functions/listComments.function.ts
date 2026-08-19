// Comments — Comment endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const ListCommentsInput = z.object({
  block_id: z.string().describe("Identifier for a Notion block or page."),
  start_cursor: z.string().optional().describe("If supplied, this endpoint will return a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results."),
  page_size: z.number().int().min(1).max(100).optional().describe("The number of items from the full list desired in the response. Maximum: 100"),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const ListCommentsOutput = z.object({
  object: z.string().describe("Always `list`"),
  next_cursor: z.union([z.string().uuid(), z.unknown()]),
  has_more: z.boolean(),
  results: z.array(z.object({
    object: z.string().describe("The comment object type name."),
    id: z.string().uuid().describe("The ID of the comment."),
    parent: z.union([z.object({
      type: z.string().describe("Always `page_id`"),
      page_id: z.string().uuid(),
    }), z.object({
      type: z.string().describe("Always `block_id`"),
      block_id: z.string().uuid(),
    })]).describe("The parent of the comment."),
    discussion_id: z.string().uuid().describe("The ID of the discussion thread this comment belongs to."),
    created_time: z.string().datetime().describe("The time when the comment was created."),
    last_edited_time: z.string().datetime().describe("The time when the comment was last edited."),
    created_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("The user who created the comment."),
    rich_text: z.array(z.object({
      plain_text: z.string().describe("The plain text content of the rich text object, without any styling."),
      href: z.union([z.string(), z.unknown()]).describe("A URL that the rich text object links to or mentions."),
      annotations: z.object({
        bold: z.boolean(),
        italic: z.boolean(),
        strikethrough: z.boolean(),
        underline: z.boolean(),
        code: z.boolean(),
        color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`, `default_background`, `gray_background`, `brown_background`, `orange_background`, `yellow_background`, `green_background`, `blue_background`, `purple_background`, `pink_background`, `red_background`"),
      }).describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
    })).max(100).describe("The rich text content of the comment."),
    display_name: z.object({
      type: z.enum(["custom", "user", "integration"]).describe("One of: `custom`, `user`, `integration`"),
      resolved_name: z.union([z.string(), z.unknown()]),
    }).describe("The display name of the comment."),
    attachments: z.array(z.object({
      category: z.enum(["audio", "image", "pdf", "productivity", "video"]).describe("One of: `audio`, `image`, `pdf`, `productivity`, `video`"),
      file: z.object({
        url: z.string().describe("The URL of the file."),
        expiry_time: z.string().datetime().describe("The time when the URL will expire."),
      }),
    })).max(100).optional().describe("Any file attachments associated with the comment."),
  })),
  type: z.string().describe("Always `comment`"),
  comment: z.record(z.string(), z.unknown()),
  request_status: z.object({
    type: z.enum(["complete", "incomplete"]).describe("Whether the result set is complete or incomplete. `incomplete` means the response does not include all rows that match the query parameters (e.g. due to a server-side pagination depth limit)."),
    incomplete_reason: z.string().optional().describe("Why the result set is incomplete. Only present when `type` is `incomplete`."),
  }).optional(),
})

export const listComments = pikkuSessionlessFunc({
  description: "List comments",
  input: ListCommentsInput,
  output: ListCommentsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/comments", data) as any
  },
})

// Comments — Comment endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const UpdateACommentInput = z.object({
  comment_id: z.string().describe("The ID of the comment to update."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  body: z.union([z.object({
  rich_text: z.array(z.object({
    annotations: z.object({
      bold: z.boolean().optional().describe("Whether the text is formatted as bold."),
      italic: z.boolean().optional().describe("Whether the text is formatted as italic."),
      strikethrough: z.boolean().optional().describe("Whether the text is formatted with a strikethrough."),
      underline: z.boolean().optional().describe("Whether the text is formatted with an underline."),
      code: z.boolean().optional().describe("Whether the text is formatted as code."),
      color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).optional().describe("The color of the text."),
    }).optional().describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
  })).max(100).describe("An array of rich text objects that represent the updated content of the comment."),
}), z.object({
  markdown: z.string().describe("The updated content of the comment as a Markdown string. Comment Markdown supports inline formatting only (bold, italic, strikethrough, code, links), inline equations ($expression$), and mentions. Block-level Markdown such as fenced code blocks, headings, lists, tables, and blockquotes does not render as structured blocks in comments."),
})]),
})

export const UpdateACommentOutput = z.union([z.object({
  object: z.string().describe("The comment object type name."),
  id: z.string().uuid().describe("The ID of the comment."),
}), z.object({
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
})])

export const updateAComment = pikkuSessionlessFunc({
  description: "Update a comment",
  input: UpdateACommentInput,
  output: UpdateACommentOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("PATCH", "/v1/comments/{comment_id}", data) as any
  },
})

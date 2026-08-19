// posts — Endpoints for creating, getting and interacting with posts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdatePostInput = z.object({
  post_id: z.string().describe("ID of the post to update"),
  id: z.string().describe("ID of the post to update"),
  is_pinned: z.boolean().optional().describe("Set to `true` to pin the post to the channel it is in"),
  message: z.string().optional().describe("The message text of the post"),
  file_ids: z.array(z.unknown()).optional().describe("The list of files attached to this post"),
  has_reactions: z.boolean().optional().describe("Set to `true` if the post has reactions to it"),
  props: z.string().optional().describe("A general JSON property bag to attach to the post"),
})

export const UpdatePostOutput = z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a post was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a post was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a post was deleted"),
  edit_at: z.number().int().optional(),
  user_id: z.string().optional(),
  channel_id: z.string().optional(),
  root_id: z.string().optional(),
  parent_id: z.string().optional(),
  original_id: z.string().optional(),
  message: z.string().optional(),
  type: z.string().optional(),
  props: z.record(z.string(), z.unknown()).optional(),
  hashtag: z.string().optional(),
  filenames: z.array(z.string()).optional().describe("This field will only appear on some posts created before Mattermost 3.5 and has since been deprecated."),
  file_ids: z.array(z.string()).optional(),
  pending_post_id: z.string().optional(),
  metadata: z.object({
    embeds: z.array(z.object({
      type: z.enum(["image", "message_attachment", "opengraph"]).optional().describe("The type of content that is embedded in this point."),
      url: z.string().optional().describe("The URL of the embedded content, if one exists."),
      data: z.record(z.string(), z.unknown()).optional().describe("Any additional information about the embedded content. Only used at this time to store OpenGraph metadata.\nThis field will be null for non-OpenGraph embeds.\n"),
    })).optional().describe("Information about content embedded in the post including OpenGraph previews, image link previews, and\nmessage attachments. This field will be null if the post does not contain embedded content.\n"),
    emojis: z.array(z.object({
      id: z.string().optional().describe("The ID of the emoji"),
      creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
      name: z.string().optional().describe("The name of the emoji"),
      create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
      update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
      delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
    })).optional().describe("The custom emojis that appear in this point or have been used in reactions to this post. This field will be\nnull if the post does not contain custom emojis.\n"),
    files: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for this file"),
      user_id: z.string().optional().describe("The ID of the user that uploaded this file"),
      post_id: z.string().optional().describe("If this file is attached to a post, the ID of that post"),
      create_at: z.number().int().optional().describe("The time in milliseconds a file was created"),
      update_at: z.number().int().optional().describe("The time in milliseconds a file was last updated"),
      delete_at: z.number().int().optional().describe("The time in milliseconds a file was deleted"),
      name: z.string().optional().describe("The name of the file"),
      extension: z.string().optional().describe("The extension at the end of the file name"),
      size: z.number().int().optional().describe("The size of the file in bytes"),
      mime_type: z.string().optional().describe("The MIME type of the file"),
      width: z.number().int().optional().describe("If this file is an image, the width of the file"),
      height: z.number().int().optional().describe("If this file is an image, the height of the file"),
      has_preview_image: z.boolean().optional().describe("If this file is an image, whether or not it has a preview-sized version"),
    })).optional().describe("The FileInfo objects for any files attached to the post. This field will be null if the post does not have\nany file attachments.\n"),
    images: z.record(z.string(), z.unknown()).optional().describe("An object mapping the URL of an external image to an object containing the dimensions of that image. This\nfield will be null if the post or its embedded content does not reference any external images.\n"),
    reactions: z.array(z.object({
      user_id: z.string().optional().describe("The ID of the user that made this reaction"),
      post_id: z.string().optional().describe("The ID of the post to which this reaction was made"),
      emoji_name: z.string().optional().describe("The name of the emoji that was used for this reaction"),
      create_at: z.number().int().optional().describe("The time in milliseconds this reaction was made"),
    })).optional().describe("Any reactions made to this point. This field will be null if no reactions have been made to this post.\n"),
  }).optional().describe("Additional information used to display the post. This field is only used to send information from the server\nto the client, and the server will ignore it if it receives it from a client.\n\nThis field will only be returned by servers running Mattermost 5.6 or higher with the experimental\nEnablePostMetadata setting enabled.\n"),
})

export const updatePost = pikkuSessionlessFunc({
  description: "Update a post. Only the fields listed below are updatable, omitted fields will be treated as blank.\n##### Permissions\nMust have `edit_post` permission for the channel the post is in.",
  input: UpdatePostInput,
  output: UpdatePostOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/posts/{post_id}", data) as any
  },
})

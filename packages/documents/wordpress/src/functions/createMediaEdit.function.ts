import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateMediaEditInput = z.object({
  id: z.string(),
  src: z.string().url().describe("URL to the edited image file."),
  modifiers: z.array(z.union([z.object({
  type: z.literal("flip").optional().describe("Flip type."),
  args: z.object({
    flip: z.object({
      horizontal: z.boolean().optional().describe("Whether to flip in the horizontal direction."),
      vertical: z.boolean().optional().describe("Whether to flip in the vertical direction."),
    }).optional().describe("Flip direction."),
  }).optional().describe("Flip arguments."),
}), z.object({
  type: z.literal("rotate").optional().describe("Rotation type."),
  args: z.object({
    angle: z.number().optional().describe("Angle to rotate clockwise in degrees."),
  }).optional().describe("Rotation arguments."),
}), z.object({
  type: z.literal("crop").optional().describe("Crop type."),
  args: z.object({
    left: z.number().optional().describe("Horizontal position from the left to begin the crop as a percentage of the image width."),
    top: z.number().optional().describe("Vertical position from the top to begin the crop as a percentage of the image height."),
    width: z.number().optional().describe("Width of the crop as a percentage of the image width."),
    height: z.number().optional().describe("Height of the crop as a percentage of the image height."),
  }).optional().describe("Crop arguments."),
})])).min(1).optional().describe("Array of image edits."),
  rotation: z.number().int().gt(0).lt(360).optional().describe("The amount to rotate the image clockwise in degrees. DEPRECATED: Use `modifiers` instead."),
  x: z.number().min(0).max(100).optional().describe("As a percentage of the image, the x position to start the crop from. DEPRECATED: Use `modifiers` instead."),
  y: z.number().min(0).max(100).optional().describe("As a percentage of the image, the y position to start the crop from. DEPRECATED: Use `modifiers` instead."),
  width: z.number().min(0).max(100).optional().describe("As a percentage of the image, the width to crop the image to. DEPRECATED: Use `modifiers` instead."),
  height: z.number().min(0).max(100).optional().describe("As a percentage of the image, the height to crop the image to. DEPRECATED: Use `modifiers` instead."),
  caption: z.object({
  raw: z.string().optional().describe("Caption for the attachment, as it exists in the database."),
  rendered: z.string().optional().describe("HTML caption for the attachment, transformed for display."),
}).optional().describe("The attachment caption."),
  description: z.object({
  raw: z.string().optional().describe("Description for the attachment, as it exists in the database."),
  rendered: z.string().optional().describe("HTML description for the attachment, transformed for display."),
}).optional().describe("The attachment description."),
  title: z.object({
  raw: z.string().optional().describe("Title for the post, as it exists in the database."),
  rendered: z.string().optional().describe("HTML title for the post, transformed for display."),
}).optional().describe("The title for the post."),
  post: z.number().int().optional().describe("The ID for the associated post of the attachment."),
  alt_text: z.string().optional().describe("Alternative text to display when attachment is not displayed."),
})

export const createMediaEdit = pikkuSessionlessFunc({
  input: CreateMediaEditInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/media/{id}/edit", data)
  },
})

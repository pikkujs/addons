import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowMacroAttachmentInput = z.object({
  attachment_id: z.number().int().describe("The ID of the attachment. Example: 498483"),
})

export const ShowMacroAttachmentOutput = z.object({
  macro_attachment: z.object({
    content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
    content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded"),
    created_at: z.string().datetime().optional().describe("The time when this attachment was created"),
    filename: z.string().optional().describe("The name of the image file"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    size: z.number().int().optional().describe("The size of the image file in bytes"),
  }).optional(),
})

export const showMacroAttachment = pikkuSessionlessFunc({
  description: "Shows the properties of the specified macro attachment.\n\n#### Allowed For\n* Agents",
  input: ShowMacroAttachmentInput,
  output: ShowMacroAttachmentOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/macros/attachments/{attachment_id}", data) as any
  },
})

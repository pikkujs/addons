import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateAssociatedMacroAttachmentInput = z.object({
  macro_id: z.number().int().describe("The ID of the macro. Example: 25"),
})

export const CreateAssociatedMacroAttachmentOutput = z.object({
  macro_attachment: z.object({
    content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
    content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded"),
    created_at: z.string().datetime().optional().describe("The time when this attachment was created"),
    filename: z.string().optional().describe("The name of the image file"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    size: z.number().int().optional().describe("The size of the image file in bytes"),
  }).optional(),
})

export const createAssociatedMacroAttachment = pikkuSessionlessFunc({
  description: "Allows an attachment to be uploaded and associated with a macro at the same time.\n\n**Note:** A macro can be associated with up to five attachments.\n\n#### Allowed For\n\n* Agents",
  input: CreateAssociatedMacroAttachmentInput,
  output: CreateAssociatedMacroAttachmentOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/macros/{macro_id}/attachments", data) as any
  },
})

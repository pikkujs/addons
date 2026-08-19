import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateMacroAttachmentOutput = z.object({
  macro_attachment: z.object({
    content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
    content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded"),
    created_at: z.string().datetime().optional().describe("The time when this attachment was created"),
    filename: z.string().optional().describe("The name of the image file"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    size: z.number().int().optional().describe("The size of the image file in bytes"),
  }).optional(),
})

export const createMacroAttachment = pikkuSessionlessFunc({
  description: "Allows an attachment to be uploaded that can be associated with a macro at a later time.\n\n**Note:** To ensure an uploaded attachment is not lost, associate it with a macro as soon as possible. From time to time, old attachments that are not not associated with any macro are purged.\n\n#### Allowed For\n\n* Agents",
  output: CreateMacroAttachmentOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/macros/attachments") as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListMacroAttachmentsInput = z.object({
  macro_id: z.number().int().describe("The ID of the macro. Example: 25"),
})

export const ListMacroAttachmentsOutput = z.object({
  macro_attachments: z.array(z.object({
    content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
    content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded"),
    created_at: z.string().datetime().optional().describe("The time when this attachment was created"),
    filename: z.string().optional().describe("The name of the image file"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    size: z.number().int().optional().describe("The size of the image file in bytes"),
  })).optional(),
})

export const listMacroAttachments = pikkuSessionlessFunc({
  description: "Lists the attachments associated with a macro.\n\n#### Allowed For\n* Agents",
  input: ListMacroAttachmentsInput,
  output: ListMacroAttachmentsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/macros/{macro_id}/attachments", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteAttachmentInput = z.object({
  attachment_id: z.number().int().describe("The ID of the attachment. Example: 498483"),
})

export const deleteAttachment = pikkuSessionlessFunc({
  description: "Deletes the attachment.\n\n#### Allowed for\n\n* Agents",
  input: DeleteAttachmentInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/attachments/{attachment_id}", data)
  },
})

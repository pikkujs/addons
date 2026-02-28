import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageGetAttachmentInput = z.object({
  messageId: z.string(),
  attachmentId: z.string(),
})

export const MessageGetAttachmentOutput = z.object({
  size: z.number(),
  data: z.string(),
})

export const messageGetAttachment = pikkuSessionlessFunc({
  description: 'Gets an attachment from a message',
  node: { displayName: 'Get Attachment', category: 'Messages', type: 'action' },
  input: MessageGetAttachmentInput,
  output: MessageGetAttachmentOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof MessageGetAttachmentOutput>>(
      'GET',
      `/users/me/messages/${input.messageId}/attachments/${input.attachmentId}`
    )
  },
})

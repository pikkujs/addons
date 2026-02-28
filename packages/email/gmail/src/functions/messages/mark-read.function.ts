import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageMarkReadInput = z.object({
  id: z.string(),
})

export const MessageMarkReadOutput = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()).optional(),
})

export const messageMarkRead = pikkuSessionlessFunc({
  description: 'Marks a message as read',
  node: { displayName: 'Mark Message as Read', category: 'Messages', type: 'action' },
  input: MessageMarkReadInput,
  output: MessageMarkReadOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof MessageMarkReadOutput>>(
      'POST',
      `/users/me/messages/${input.id}/modify`,
      { body: { removeLabelIds: ['UNREAD'] } }
    )
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageMarkUnreadInput = z.object({
  id: z.string(),
})

export const MessageMarkUnreadOutput = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()).optional(),
})

export const messageMarkUnread = pikkuSessionlessFunc({
  description: 'Marks a message as unread',
  node: { displayName: 'Mark Message as Unread', category: 'Messages', type: 'action' },
  input: MessageMarkUnreadInput,
  output: MessageMarkUnreadOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof MessageMarkUnreadOutput>>(
      'POST',
      `/users/me/messages/${input.id}/modify`,
      { body: { addLabelIds: ['UNREAD'] } }
    )
  },
})

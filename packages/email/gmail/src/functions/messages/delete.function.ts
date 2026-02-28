import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageDeleteInput = z.object({
  id: z.string(),
  permanent: z.boolean().optional().default(false),
})

export const MessageDeleteOutput = z.object({
  success: z.boolean(),
})

export const messageDelete = pikkuSessionlessFunc({
  description: 'Deletes or trashes a message',
  node: { displayName: 'Delete Message', category: 'Messages', type: 'action' },
  input: MessageDeleteInput,
  output: MessageDeleteOutput,
  func: async ({ gmail }, input) => {
    if (input.permanent) {
      await gmail.request('DELETE', `/users/me/messages/${input.id}`)
    } else {
      await gmail.request('POST', `/users/me/messages/${input.id}/trash`)
    }

    return { success: true }
  },
})

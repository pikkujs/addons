import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageDeleteInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  message_id: z.number().describe('Identifier of the message to delete'),
})

export const MessageDeleteOutput = z.object({
  success: z.boolean().describe('Whether the message was deleted'),
})

type Output = z.infer<typeof MessageDeleteOutput>

export const messageDelete = pikkuSessionlessFunc({
  description: 'Deletes a message from a chat',
  node: { displayName: 'Delete Message', category: 'Message', type: 'action' },
  input: MessageDeleteInput,
  output: MessageDeleteOutput,
  func: async ({ telegram }, { chat_id, message_id }) => {
    await telegram.request<boolean>('deleteMessage', { body: { chat_id, message_id } })
    return { success: true }
  },
})

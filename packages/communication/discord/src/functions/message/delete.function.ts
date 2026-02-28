import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageDeleteInput = z.object({
  channel_id: z.string().describe('The ID of the channel'),
  message_id: z.string().describe('The ID of the message to delete'),
})

export const MessageDeleteOutput = z.object({
  success: z.boolean().describe('Whether the message was deleted'),
})

type Output = z.infer<typeof MessageDeleteOutput>

export const messageDelete = pikkuSessionlessFunc({
  description: 'Deletes a message from a channel',
  node: { displayName: 'Delete Message', category: 'Message', type: 'action' },
  input: MessageDeleteInput,
  output: MessageDeleteOutput,
  func: async ({ discord }, { channel_id, message_id }) => {
    await discord.request('DELETE', `/channels/${channel_id}/messages/${message_id}`)
    return { success: true }
  },
})

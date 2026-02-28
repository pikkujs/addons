import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageReactInput = z.object({
  channel_id: z.string().describe('The ID of the channel'),
  message_id: z.string().describe('The ID of the message'),
  emoji: z.string().describe('The emoji to react with (Unicode emoji or custom emoji in format name:id)'),
})

export const MessageReactOutput = z.object({
  success: z.boolean().describe('Whether the reaction was added'),
})

type Output = z.infer<typeof MessageReactOutput>

export const messageReact = pikkuSessionlessFunc({
  description: 'Adds a reaction to a message',
  node: { displayName: 'React to Message', category: 'Message', type: 'action' },
  input: MessageReactInput,
  output: MessageReactOutput,
  func: async ({ discord }, { channel_id, message_id, emoji }) => {
    const encodedEmoji = encodeURIComponent(emoji)
    await discord.request('PUT', `/channels/${channel_id}/messages/${message_id}/reactions/${encodedEmoji}/@me`)
    return { success: true }
  },
})

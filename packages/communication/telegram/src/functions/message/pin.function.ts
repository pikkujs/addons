import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessagePinInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  message_id: z.number().describe('Identifier of a message to pin'),
  disable_notification: z.boolean().optional().describe('Pass True if it is not necessary to send a notification to all chat members about the new pinned message'),
})

export const MessagePinOutput = z.object({
  success: z.boolean().describe('Whether the message was pinned successfully'),
})

type Input = z.infer<typeof MessagePinInput>

export const messagePin = pikkuSessionlessFunc({
  description: 'Pins a message in a chat',
  node: { displayName: 'Pin Message', category: 'Message', type: 'action' },
  input: MessagePinInput,
  output: MessagePinOutput,
  func: async ({ telegram }, data) => {
    await telegram.request<boolean>('pinChatMessage', { body: data as Input })
    return { success: true }
  },
})

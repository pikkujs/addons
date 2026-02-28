import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendStickerInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  sticker: z.string().describe('Sticker to send. Pass a file_id, an HTTP URL for a .webp file, or upload via multipart/form-data'),
  emoji: z.string().optional().describe('Emoji associated with the sticker'),
  disable_notification: z.boolean().optional().describe('Sends the message silently'),
  reply_to_message_id: z.number().optional().describe('If the message is a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendStickerOutput = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
})

type Input = z.infer<typeof MessageSendStickerInput>
type Output = z.infer<typeof MessageSendStickerOutput>

export const messageSendSticker = pikkuSessionlessFunc({
  description: 'Sends a sticker to a chat',
  node: { displayName: 'Send Sticker', category: 'Message', type: 'action' },
  input: MessageSendStickerInput,
  output: MessageSendStickerOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendSticker', { body: data as Input })
  },
})

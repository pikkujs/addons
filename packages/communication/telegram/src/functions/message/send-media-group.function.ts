import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MediaItemSchema = z.object({
  type: z.enum(['photo', 'video']).describe('Type of the media'),
  media: z.string().describe('File to send. Pass a file_id or HTTP URL'),
  caption: z.string().optional().describe('Caption of the media, 0-1024 characters'),
  parse_mode: z.enum(['Markdown', 'MarkdownV2', 'HTML']).optional().describe('Mode for parsing entities in the caption'),
})

export const MessageSendMediaGroupInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  media: z.array(MediaItemSchema).min(2).max(10).describe('Array of InputMediaPhoto and InputMediaVideo (2-10 items)'),
  disable_notification: z.boolean().optional().describe('Sends the messages silently'),
  reply_to_message_id: z.number().optional().describe('If the messages are a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendMediaGroupOutput = z.array(z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
})).describe('Array of sent messages')

type Input = z.infer<typeof MessageSendMediaGroupInput>
type Output = z.infer<typeof MessageSendMediaGroupOutput>

export const messageSendMediaGroup = pikkuSessionlessFunc({
  description: 'Sends a group of photos or videos as an album',
  node: { displayName: 'Send Media Group', category: 'Message', type: 'action' },
  input: MessageSendMediaGroupInput,
  output: MessageSendMediaGroupOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendMediaGroup', { body: data as Input })
  },
})

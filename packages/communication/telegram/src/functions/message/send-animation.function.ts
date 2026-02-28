import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendAnimationInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  animation: z.string().describe('Animation to send. Pass a file_id, an HTTP URL, or upload via multipart/form-data'),
  duration: z.number().optional().describe('Duration of sent animation in seconds'),
  width: z.number().optional().describe('Animation width'),
  height: z.number().optional().describe('Animation height'),
  thumbnail: z.string().optional().describe('Thumbnail of the file sent'),
  caption: z.string().optional().describe('Animation caption, 0-1024 characters'),
  parse_mode: z.enum(['Markdown', 'MarkdownV2', 'HTML']).optional().describe('Mode for parsing entities in the animation caption'),
  disable_notification: z.boolean().optional().describe('Sends the message silently'),
  reply_to_message_id: z.number().optional().describe('If the message is a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendAnimationOutput = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
})

type Input = z.infer<typeof MessageSendAnimationInput>
type Output = z.infer<typeof MessageSendAnimationOutput>

export const messageSendAnimation = pikkuSessionlessFunc({
  description: 'Sends an animation (GIF or H.264/MPEG-4 AVC video without sound) to a chat',
  node: { displayName: 'Send Animation', category: 'Message', type: 'action' },
  input: MessageSendAnimationInput,
  output: MessageSendAnimationOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendAnimation', { body: data as Input })
  },
})

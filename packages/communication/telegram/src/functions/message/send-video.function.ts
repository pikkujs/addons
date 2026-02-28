import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendVideoInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  video: z.string().describe('Video to send. Pass a file_id, an HTTP URL, or upload via multipart/form-data'),
  duration: z.number().optional().describe('Duration of sent video in seconds'),
  width: z.number().optional().describe('Video width'),
  height: z.number().optional().describe('Video height'),
  thumbnail: z.string().optional().describe('Thumbnail of the file sent'),
  caption: z.string().optional().describe('Video caption, 0-1024 characters'),
  parse_mode: z.enum(['Markdown', 'MarkdownV2', 'HTML']).optional().describe('Mode for parsing entities in the video caption'),
  supports_streaming: z.boolean().optional().describe('Pass True if the uploaded video is suitable for streaming'),
  disable_notification: z.boolean().optional().describe('Sends the message silently'),
  reply_to_message_id: z.number().optional().describe('If the message is a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendVideoOutput = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
})

type Input = z.infer<typeof MessageSendVideoInput>
type Output = z.infer<typeof MessageSendVideoOutput>

export const messageSendVideo = pikkuSessionlessFunc({
  description: 'Sends a video file to a chat',
  node: { displayName: 'Send Video', category: 'Message', type: 'action' },
  input: MessageSendVideoInput,
  output: MessageSendVideoOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendVideo', { body: data as Input })
  },
})

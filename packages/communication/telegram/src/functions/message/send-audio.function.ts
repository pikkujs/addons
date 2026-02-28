import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendAudioInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  audio: z.string().describe('Audio file to send. Pass a file_id, an HTTP URL, or upload via multipart/form-data'),
  duration: z.number().optional().describe('Duration of the audio in seconds'),
  performer: z.string().optional().describe('Performer of the audio'),
  title: z.string().optional().describe('Track name'),
  thumbnail: z.string().optional().describe('Thumbnail of the file sent'),
  caption: z.string().optional().describe('Audio caption, 0-1024 characters'),
  parse_mode: z.enum(['Markdown', 'MarkdownV2', 'HTML']).optional().describe('Mode for parsing entities in the audio caption'),
  disable_notification: z.boolean().optional().describe('Sends the message silently'),
  reply_to_message_id: z.number().optional().describe('If the message is a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendAudioOutput = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
})

type Input = z.infer<typeof MessageSendAudioInput>
type Output = z.infer<typeof MessageSendAudioOutput>

export const messageSendAudio = pikkuSessionlessFunc({
  description: 'Sends an audio file to a chat',
  node: { displayName: 'Send Audio', category: 'Message', type: 'action' },
  input: MessageSendAudioInput,
  output: MessageSendAudioOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendAudio', { body: data as Input })
  },
})

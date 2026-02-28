import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  text: z.string().describe('Text of the message to be sent, 1-4096 characters'),
  parse_mode: z.enum(['Markdown', 'MarkdownV2', 'HTML']).optional().describe('Mode for parsing entities in the message text'),
  disable_web_page_preview: z.boolean().optional().describe('Disables link previews for links in this message'),
  disable_notification: z.boolean().optional().describe('Sends the message silently. Users will receive a notification with no sound'),
  reply_to_message_id: z.number().optional().describe('If the message is a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendOutput = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  text: z.string().optional().describe('The actual UTF-8 text of the message'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
})

type Input = z.infer<typeof MessageSendInput>
type Output = z.infer<typeof MessageSendOutput>

export const messageSend = pikkuSessionlessFunc({
  description: 'Sends a text message to a chat',
  node: { displayName: 'Send Message', category: 'Message', type: 'action' },
  input: MessageSendInput,
  output: MessageSendOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendMessage', { body: data as Input })
  },
})

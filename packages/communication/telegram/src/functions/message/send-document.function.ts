import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendDocumentInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  document: z.string().describe('File to send. Pass a file_id, an HTTP URL, or upload via multipart/form-data'),
  caption: z.string().optional().describe('Document caption, 0-1024 characters'),
  parse_mode: z.enum(['Markdown', 'MarkdownV2', 'HTML']).optional().describe('Mode for parsing entities in the document caption'),
  disable_notification: z.boolean().optional().describe('Sends the message silently'),
  reply_to_message_id: z.number().optional().describe('If the message is a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendDocumentOutput = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
})

type Input = z.infer<typeof MessageSendDocumentInput>
type Output = z.infer<typeof MessageSendDocumentOutput>

export const messageSendDocument = pikkuSessionlessFunc({
  description: 'Sends a document to a chat',
  node: { displayName: 'Send Document', category: 'Message', type: 'action' },
  input: MessageSendDocumentInput,
  output: MessageSendDocumentOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendDocument', { body: data as Input })
  },
})

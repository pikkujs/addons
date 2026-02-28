import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageEditInput = z.object({
  chat_id: z.union([z.string(), z.number()]).optional().describe('Required if inline_message_id is not specified. Unique identifier for the target chat'),
  message_id: z.number().optional().describe('Required if inline_message_id is not specified. Identifier of the message to edit'),
  inline_message_id: z.string().optional().describe('Required if chat_id and message_id are not specified. Identifier of the inline message'),
  text: z.string().describe('New text of the message, 1-4096 characters'),
  parse_mode: z.enum(['Markdown', 'MarkdownV2', 'HTML']).optional().describe('Mode for parsing entities in the message text'),
  disable_web_page_preview: z.boolean().optional().describe('Disables link previews for links in this message'),
})

export const MessageEditOutput = z.union([
  z.object({
    message_id: z.number().describe('Unique message identifier'),
    date: z.number().describe('Date the message was sent in Unix time'),
    text: z.string().optional().describe('The actual UTF-8 text of the message'),
    chat: z.object({
      id: z.number().describe('Unique identifier for this chat'),
      type: z.string().describe('Type of chat'),
    }).describe('Chat the message belongs to'),
  }),
  z.literal(true),
])

type Input = z.infer<typeof MessageEditInput>
type Output = z.infer<typeof MessageEditOutput>

export const messageEdit = pikkuSessionlessFunc({
  description: 'Edits a text message',
  node: { displayName: 'Edit Message', category: 'Message', type: 'action' },
  input: MessageEditInput,
  output: MessageEditOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('editMessageText', { body: data as Input })
  },
})

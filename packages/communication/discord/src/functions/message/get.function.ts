import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageGetInput = z.object({
  channel_id: z.string().describe('The ID of the channel'),
  message_id: z.string().describe('The ID of the message'),
})

export const MessageGetOutput = z.object({
  id: z.string().describe('ID of the message'),
  channel_id: z.string().describe('ID of the channel'),
  content: z.string().describe('Contents of the message'),
  timestamp: z.string().describe('When this message was sent'),
  edited_timestamp: z.string().nullable().describe('When this message was edited'),
  author: z.object({
    id: z.string().describe('The user ID'),
    username: z.string().describe('The username'),
  }).describe('The author of this message'),
})

type Output = z.infer<typeof MessageGetOutput>

export const messageGet = pikkuSessionlessFunc({
  description: 'Gets a specific message from a channel',
  node: { displayName: 'Get Message', category: 'Message', type: 'action' },
  input: MessageGetInput,
  output: MessageGetOutput,
  func: async ({ discord }, { channel_id, message_id }) => {
    return await discord.request<Output>('GET', `/channels/${channel_id}/messages/${message_id}`)
  },
})

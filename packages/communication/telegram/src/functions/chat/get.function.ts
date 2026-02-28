import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatGetInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target supergroup or channel'),
})

export const ChatGetOutput = z.object({
  id: z.number().describe('Unique identifier for this chat'),
  type: z.enum(['private', 'group', 'supergroup', 'channel']).describe('Type of chat'),
  title: z.string().optional().describe('Title, for supergroups, channels and group chats'),
  username: z.string().optional().describe('Username, for private chats, supergroups and channels'),
  first_name: z.string().optional().describe('First name of the other party in a private chat'),
  last_name: z.string().optional().describe('Last name of the other party in a private chat'),
  description: z.string().optional().describe('Description, for groups, supergroups and channel chats'),
})

type Output = z.infer<typeof ChatGetOutput>

export const chatGet = pikkuSessionlessFunc({
  description: 'Get up to date information about a chat',
  node: { displayName: 'Get Chat', category: 'Chat', type: 'action' },
  input: ChatGetInput,
  output: ChatGetOutput,
  func: async ({ telegram }, { chat_id }) => {
    return await telegram.request<Output>('getChat', { body: { chat_id } })
  },
})

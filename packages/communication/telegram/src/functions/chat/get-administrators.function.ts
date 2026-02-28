import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatGetAdministratorsInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target supergroup or channel'),
})

const ChatMemberSchema = z.object({
  user: z.object({
    id: z.number().describe('Unique identifier for this user'),
    is_bot: z.boolean().describe('True, if this user is a bot'),
    first_name: z.string().describe('User first name'),
    last_name: z.string().optional().describe('User last name'),
    username: z.string().optional().describe('User username'),
  }).describe('Information about the user'),
  status: z.string().describe('The member status in the chat'),
  can_be_edited: z.boolean().optional().describe('True, if the bot is allowed to edit administrator privileges'),
  can_manage_chat: z.boolean().optional().describe('True, if the administrator can access chat event log'),
  can_delete_messages: z.boolean().optional().describe('True, if the administrator can delete messages'),
  can_manage_video_chats: z.boolean().optional().describe('True, if the administrator can manage video chats'),
  can_restrict_members: z.boolean().optional().describe('True, if the administrator can restrict members'),
  can_promote_members: z.boolean().optional().describe('True, if the administrator can promote members'),
  can_change_info: z.boolean().optional().describe('True, if the administrator can change chat info'),
  can_invite_users: z.boolean().optional().describe('True, if the administrator can invite new users'),
  can_post_messages: z.boolean().optional().describe('True, if the administrator can post messages (channels only)'),
  can_edit_messages: z.boolean().optional().describe('True, if the administrator can edit messages (channels only)'),
  can_pin_messages: z.boolean().optional().describe('True, if the administrator can pin messages'),
})

export const ChatGetAdministratorsOutput = z.array(ChatMemberSchema).describe('Array of chat administrators')

type Output = z.infer<typeof ChatGetAdministratorsOutput>

export const chatGetAdministrators = pikkuSessionlessFunc({
  description: 'Get a list of administrators in a chat',
  node: { displayName: 'Get Chat Administrators', category: 'Chat', type: 'action' },
  input: ChatGetAdministratorsInput,
  output: ChatGetAdministratorsOutput,
  func: async ({ telegram }, { chat_id }) => {
    return await telegram.request<Output>('getChatAdministrators', { body: { chat_id } })
  },
})

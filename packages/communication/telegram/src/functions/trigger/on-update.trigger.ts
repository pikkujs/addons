import { z } from 'zod'
import { pikkuTriggerFunc } from '#pikku'

const UpdateType = z.enum([
  'message',
  'edited_message',
  'channel_post',
  'edited_channel_post',
  'inline_query',
  'callback_query',
  'shipping_query',
  'pre_checkout_query',
  'poll',
  'poll_answer',
  'my_chat_member',
  'chat_member',
  'chat_join_request',
])

export const OnUpdateConfig = z.object({
  allowedUpdates: z.array(UpdateType).optional().describe('List of update types to receive. Specify an empty list to receive all updates.'),
  restrictToChatIds: z.string().optional().describe('Comma-separated list of chat IDs to restrict the trigger to'),
  restrictToUserIds: z.string().optional().describe('Comma-separated list of user IDs to restrict the trigger to'),
  pollInterval: z.number().optional().default(1000).describe('Polling interval in milliseconds'),
})

const UserSchema = z.object({
  id: z.number().describe('Unique identifier for this user'),
  is_bot: z.boolean().describe('True, if this user is a bot'),
  first_name: z.string().describe('User first name'),
  last_name: z.string().optional().describe('User last name'),
  username: z.string().optional().describe('User username'),
  language_code: z.string().optional().describe('IETF language tag of the user language'),
}).passthrough()

const ChatSchema = z.object({
  id: z.number().describe('Unique identifier for this chat'),
  type: z.string().describe('Type of chat'),
  title: z.string().optional().describe('Title, for supergroups, channels and group chats'),
  username: z.string().optional().describe('Username, for private chats, supergroups and channels'),
  first_name: z.string().optional().describe('First name of the other party in a private chat'),
  last_name: z.string().optional().describe('Last name of the other party in a private chat'),
}).passthrough()

const MessageSchema = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: ChatSchema.describe('Chat the message belongs to'),
  from: UserSchema.optional().describe('Sender of the message'),
  text: z.string().optional().describe('The actual UTF-8 text of the message'),
  photo: z.array(z.object({
    file_id: z.string(),
    file_unique_id: z.string(),
    width: z.number(),
    height: z.number(),
    file_size: z.number().optional(),
  })).optional().describe('Message is a photo, available sizes of the photo'),
  document: z.object({
    file_id: z.string(),
    file_unique_id: z.string(),
    file_name: z.string().optional(),
    mime_type: z.string().optional(),
    file_size: z.number().optional(),
  }).optional().describe('Message is a general file'),
  video: z.object({
    file_id: z.string(),
    file_unique_id: z.string(),
    width: z.number(),
    height: z.number(),
    duration: z.number(),
    file_name: z.string().optional(),
    mime_type: z.string().optional(),
    file_size: z.number().optional(),
  }).optional().describe('Message is a video'),
  audio: z.object({
    file_id: z.string(),
    file_unique_id: z.string(),
    duration: z.number(),
    performer: z.string().optional(),
    title: z.string().optional(),
    file_name: z.string().optional(),
    mime_type: z.string().optional(),
    file_size: z.number().optional(),
  }).optional().describe('Message is an audio file'),
  sticker: z.object({
    file_id: z.string(),
    file_unique_id: z.string(),
    type: z.string(),
    width: z.number(),
    height: z.number(),
    is_animated: z.boolean(),
    is_video: z.boolean(),
    emoji: z.string().optional(),
    set_name: z.string().optional(),
    file_size: z.number().optional(),
  }).optional().describe('Message is a sticker'),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    horizontal_accuracy: z.number().optional(),
  }).optional().describe('Message is a shared location'),
  reply_to_message: z.any().optional().describe('The original message if this is a reply'),
  media_group_id: z.string().optional().describe('The unique identifier of a media message group'),
}).passthrough()

const CallbackQuerySchema = z.object({
  id: z.string().describe('Unique identifier for this query'),
  from: UserSchema.describe('Sender'),
  message: MessageSchema.optional().describe('Message with the callback button'),
  inline_message_id: z.string().optional().describe('Identifier of the message sent via the bot in inline mode'),
  chat_instance: z.string().describe('Global identifier corresponding to the chat'),
  data: z.string().optional().describe('Data associated with the callback button'),
  game_short_name: z.string().optional().describe('Short name of a Game to be returned'),
}).passthrough()

const InlineQuerySchema = z.object({
  id: z.string().describe('Unique identifier for this query'),
  from: UserSchema.describe('Sender'),
  query: z.string().describe('Text of the query'),
  offset: z.string().describe('Offset of the results to be returned'),
  chat_type: z.string().optional().describe('Type of the chat from which the inline query was sent'),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional().describe('Sender location'),
}).passthrough()

export const OnUpdateOutput = z.object({
  update_id: z.number().describe('The unique update identifier'),
  message: MessageSchema.optional().describe('New incoming message'),
  edited_message: MessageSchema.optional().describe('New version of a message that was edited'),
  channel_post: MessageSchema.optional().describe('New incoming channel post'),
  edited_channel_post: MessageSchema.optional().describe('New version of a channel post that was edited'),
  inline_query: InlineQuerySchema.optional().describe('New incoming inline query'),
  callback_query: CallbackQuerySchema.optional().describe('New incoming callback query'),
  shipping_query: z.any().optional().describe('New incoming shipping query'),
  pre_checkout_query: z.any().optional().describe('New incoming pre-checkout query'),
  poll: z.any().optional().describe('New poll state'),
  poll_answer: z.any().optional().describe('User changed their answer in a non-anonymous poll'),
  my_chat_member: z.any().optional().describe('Bot chat member status was updated'),
  chat_member: z.any().optional().describe('Chat member status was updated'),
  chat_join_request: z.any().optional().describe('A request to join the chat has been sent'),
}).passthrough()

type Config = z.infer<typeof OnUpdateConfig>
type Output = z.infer<typeof OnUpdateOutput>

interface GetUpdatesResponse {
  update_id: number
  message?: {
    chat?: { id: number }
    from?: { id: number }
  }
  edited_message?: {
    chat?: { id: number }
    from?: { id: number }
  }
  channel_post?: {
    chat?: { id: number }
    from?: { id: number }
  }
  callback_query?: {
    from?: { id: number }
    message?: { chat?: { id: number } }
  }
  [key: string]: unknown
}

export const onUpdate = pikkuTriggerFunc({
  node: { displayName: 'Telegram Trigger', category: 'Trigger', type: 'trigger' },
  title: 'Telegram Update',
  description: 'Triggers when a Telegram update is received (message, callback query, inline query, etc.)',
  input: OnUpdateConfig,
  output: OnUpdateOutput,
  func: async ({ telegram }, config, { trigger }) => {
    let lastUpdateId = 0
    let polling = true

    const chatIds = config.restrictToChatIds
      ? config.restrictToChatIds.split(',').map(id => parseInt(id.trim(), 10))
      : null

    const userIds = config.restrictToUserIds
      ? config.restrictToUserIds.split(',').map(id => parseInt(id.trim(), 10))
      : null

    const shouldProcess = (update: GetUpdatesResponse): boolean => {
      let chatId: number | undefined
      let userId: number | undefined

      if (update.message) {
        chatId = update.message.chat?.id
        userId = update.message.from?.id
      } else if (update.edited_message) {
        chatId = update.edited_message.chat?.id
        userId = update.edited_message.from?.id
      } else if (update.channel_post) {
        chatId = update.channel_post.chat?.id
        userId = update.channel_post.from?.id
      } else if (update.callback_query) {
        chatId = update.callback_query.message?.chat?.id
        userId = update.callback_query.from?.id
      }

      if (chatIds && chatId && !chatIds.includes(chatId)) {
        return false
      }

      if (userIds && userId && !userIds.includes(userId)) {
        return false
      }

      return true
    }

    const poll = async () => {
      try {
        const body: Record<string, unknown> = {
          offset: lastUpdateId + 1,
          timeout: 30,
        }

        if (config.allowedUpdates && config.allowedUpdates.length > 0) {
          body.allowed_updates = config.allowedUpdates
        }

        const updates = await telegram.request<GetUpdatesResponse[]>('getUpdates', { body })

        for (const update of updates) {
          if (update.update_id > lastUpdateId) {
            lastUpdateId = update.update_id
          }

          if (shouldProcess(update)) {
            trigger.invoke(update as Output)
          }
        }
      } catch (error) {
        // Log error but continue polling
        console.error('Telegram polling error:', error)
      }
    }

    const intervalId = setInterval(async () => {
      if (polling) {
        await poll()
      }
    }, config.pollInterval)

    // Initial poll
    await poll()

    return async () => {
      polling = false
      clearInterval(intervalId)
    }
  },
})

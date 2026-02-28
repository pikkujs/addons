import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendLocationInput = z.object({
  chat_id: z.union([z.string(), z.number()]).describe('Unique identifier for the target chat or username of the target channel'),
  latitude: z.number().describe('Latitude of the location'),
  longitude: z.number().describe('Longitude of the location'),
  horizontal_accuracy: z.number().optional().describe('The radius of uncertainty for the location, measured in meters; 0-1500'),
  disable_notification: z.boolean().optional().describe('Sends the message silently'),
  reply_to_message_id: z.number().optional().describe('If the message is a reply, ID of the original message'),
  message_thread_id: z.number().optional().describe('Unique identifier for the target message thread (topic) of the forum'),
})

export const MessageSendLocationOutput = z.object({
  message_id: z.number().describe('Unique message identifier'),
  date: z.number().describe('Date the message was sent in Unix time'),
  chat: z.object({
    id: z.number().describe('Unique identifier for this chat'),
    type: z.string().describe('Type of chat'),
  }).describe('Chat the message belongs to'),
  location: z.object({
    latitude: z.number().describe('Latitude'),
    longitude: z.number().describe('Longitude'),
  }).describe('Location that was sent'),
})

type Input = z.infer<typeof MessageSendLocationInput>
type Output = z.infer<typeof MessageSendLocationOutput>

export const messageSendLocation = pikkuSessionlessFunc({
  description: 'Sends a location to a chat',
  node: { displayName: 'Send Location', category: 'Message', type: 'action' },
  input: MessageSendLocationInput,
  output: MessageSendLocationOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('sendLocation', { body: data as Input })
  },
})

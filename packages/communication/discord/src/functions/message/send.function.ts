import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const EmbedSchema = z.object({
  title: z.string().optional().describe('Title of the embed'),
  description: z.string().optional().describe('Description of the embed'),
  url: z.string().optional().describe('URL of the embed'),
  color: z.number().optional().describe('Color code of the embed'),
  footer: z.object({
    text: z.string().describe('Footer text'),
    icon_url: z.string().optional().describe('URL of footer icon'),
  }).optional().describe('Footer information'),
  image: z.object({
    url: z.string().describe('Source URL of image'),
  }).optional().describe('Image information'),
  thumbnail: z.object({
    url: z.string().describe('Source URL of thumbnail'),
  }).optional().describe('Thumbnail information'),
  author: z.object({
    name: z.string().describe('Name of author'),
    url: z.string().optional().describe('URL of author'),
    icon_url: z.string().optional().describe('URL of author icon'),
  }).optional().describe('Author information'),
  fields: z.array(z.object({
    name: z.string().describe('Name of the field'),
    value: z.string().describe('Value of the field'),
    inline: z.boolean().optional().describe('Whether the field should display inline'),
  })).optional().describe('Fields information'),
})

export const MessageSendInput = z.object({
  channel_id: z.string().describe('The ID of the channel to send the message to'),
  content: z.string().optional().describe('Message contents (up to 2000 characters)'),
  tts: z.boolean().optional().describe('True if this is a TTS message'),
  embeds: z.array(EmbedSchema).optional().describe('Embedded rich content (up to 10 embeds)'),
  message_reference: z.object({
    message_id: z.string().describe('ID of the message to reply to'),
  }).optional().describe('Reference to reply to a message'),
})

export const MessageSendOutput = z.object({
  id: z.string().describe('ID of the message'),
  channel_id: z.string().describe('ID of the channel'),
  content: z.string().describe('Contents of the message'),
  timestamp: z.string().describe('When this message was sent'),
  author: z.object({
    id: z.string().describe('The user ID'),
    username: z.string().describe('The username'),
  }).describe('The author of this message'),
})

type Output = z.infer<typeof MessageSendOutput>

export const messageSend = pikkuSessionlessFunc({
  description: 'Sends a message to a channel',
  node: { displayName: 'Send Message', category: 'Message', type: 'action' },
  input: MessageSendInput,
  output: MessageSendOutput,
  func: async ({ discord }, { channel_id, ...body }) => {
    return await discord.request<Output>('POST', `/channels/${channel_id}/messages`, { body })
  },
})

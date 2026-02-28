import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelGetInput = z.object({
  channel_id: z.string().describe('The ID of the channel'),
})

export const ChannelGetOutput = z.object({
  id: z.string().describe('The ID of this channel'),
  type: z.number().describe('The type of channel'),
  guild_id: z.string().optional().describe('The ID of the guild'),
  name: z.string().optional().describe('The name of the channel'),
  topic: z.string().nullable().optional().describe('The channel topic'),
  nsfw: z.boolean().optional().describe('Whether the channel is NSFW'),
  position: z.number().optional().describe('Sorting position of the channel'),
})

type Output = z.infer<typeof ChannelGetOutput>

export const channelGet = pikkuSessionlessFunc({
  description: 'Gets a channel by ID',
  node: { displayName: 'Get Channel', category: 'Channel', type: 'action' },
  input: ChannelGetInput,
  output: ChannelGetOutput,
  func: async ({ discord }, { channel_id }) => {
    return await discord.request<Output>('GET', `/channels/${channel_id}`)
  },
})

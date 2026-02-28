import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelCreateInput = z.object({
  guild_id: z.string().describe('The ID of the guild to create the channel in'),
  name: z.string().describe('Channel name (1-100 characters)'),
  type: z.number().optional().describe('The type of channel (0=text, 2=voice, 4=category, 5=announcement, 13=stage)'),
  topic: z.string().optional().describe('Channel topic (0-1024 characters)'),
  nsfw: z.boolean().optional().describe('Whether the channel is NSFW'),
  parent_id: z.string().optional().describe('ID of the parent category'),
  position: z.number().optional().describe('Sorting position of the channel'),
})

export const ChannelCreateOutput = z.object({
  id: z.string().describe('The ID of this channel'),
  type: z.number().describe('The type of channel'),
  guild_id: z.string().optional().describe('The ID of the guild'),
  name: z.string().optional().describe('The name of the channel'),
  topic: z.string().nullable().optional().describe('The channel topic'),
})

type Output = z.infer<typeof ChannelCreateOutput>

export const channelCreate = pikkuSessionlessFunc({
  description: 'Creates a new channel in a guild',
  node: { displayName: 'Create Channel', category: 'Channel', type: 'action' },
  input: ChannelCreateInput,
  output: ChannelCreateOutput,
  func: async ({ discord }, { guild_id, ...body }) => {
    return await discord.request<Output>('POST', `/guilds/${guild_id}/channels`, { body })
  },
})

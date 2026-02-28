import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelDeleteInput = z.object({
  channel_id: z.string().describe('The ID of the channel to delete'),
})

export const ChannelDeleteOutput = z.object({
  id: z.string().describe('The ID of the deleted channel'),
  type: z.number().describe('The type of channel'),
  name: z.string().optional().describe('The name of the channel'),
})

type Output = z.infer<typeof ChannelDeleteOutput>

export const channelDelete = pikkuSessionlessFunc({
  description: 'Deletes a channel',
  node: { displayName: 'Delete Channel', category: 'Channel', type: 'action' },
  input: ChannelDeleteInput,
  output: ChannelDeleteOutput,
  func: async ({ discord }, { channel_id }) => {
    return await discord.request<Output>('DELETE', `/channels/${channel_id}`)
  },
})

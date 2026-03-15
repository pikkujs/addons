import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelsListInput = z.object({
  limit: z.number().optional().describe('Maximum number of channels to return'),
  cursor: z.string().optional().describe('Pagination cursor'),
  types: z.string().optional().describe('Channel types (comma-separated: public_channel,private_channel,mpim,im)'),
  excludeArchived: z.boolean().optional().describe('Exclude archived channels'),
})

export const ChannelsListOutput = z.object({
  ok: z.boolean(),
  channels: z.array(z.object({
    id: z.string(),
    name: z.string(),
    is_channel: z.boolean(),
    is_private: z.boolean(),
    is_archived: z.boolean(),
    is_member: z.boolean(),
    created: z.number(),
    num_members: z.number().optional(),
  })),
  response_metadata: z.object({
    next_cursor: z.string(),
  }).optional(),
})

type Output = z.infer<typeof ChannelsListOutput>

export const channelsList = pikkuSessionlessFunc({
  description: 'List Slack channels',
  node: { displayName: 'List Channels', category: 'Communication', type: 'action' },
  input: ChannelsListInput,
  output: ChannelsListOutput,
  func: async ({ slack }, data) => {
  return await slack.request('GET', 'conversations.list', {
    qs: {
      limit: data.limit,
      cursor: data.cursor,
      types: data.types,
      exclude_archived: data.excludeArchived,
    },
  }) as Output
  },
})

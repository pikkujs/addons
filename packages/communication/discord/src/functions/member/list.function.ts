import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberListInput = z.object({
  guild_id: z.string().describe('The ID of the guild'),
  limit: z.number().max(1000).optional().describe('Max number of members to return (1-1000)'),
  after: z.string().optional().describe('The highest user ID in the previous page'),
})

export const MemberSchema = z.object({
  user: z.object({
    id: z.string().describe('The user ID'),
    username: z.string().describe('The username'),
    discriminator: z.string().describe('The user discriminator'),
    avatar: z.string().nullable().describe('The user avatar hash'),
  }).optional().describe('The user this guild member represents'),
  nick: z.string().nullable().optional().describe('This user guild nickname'),
  roles: z.array(z.string()).describe('Array of role IDs'),
  joined_at: z.string().describe('When the user joined the guild'),
})

export const MemberListOutput = z.array(MemberSchema).describe('List of guild members')

type Output = z.infer<typeof MemberListOutput>

export const memberList = pikkuSessionlessFunc({
  description: 'Lists members in a guild',
  node: { displayName: 'List Members', category: 'Member', type: 'action' },
  input: MemberListInput,
  output: MemberListOutput,
  func: async ({ discord }, { guild_id, limit, after }) => {
    return await discord.request<Output>('GET', `/guilds/${guild_id}/members`, {
      qs: { limit, after },
    })
  },
})

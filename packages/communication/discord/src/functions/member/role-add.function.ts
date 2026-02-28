import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberRoleAddInput = z.object({
  guild_id: z.string().describe('The ID of the guild'),
  user_id: z.string().describe('The ID of the user'),
  role_id: z.string().describe('The ID of the role to add'),
})

export const MemberRoleAddOutput = z.object({
  success: z.boolean().describe('Whether the role was added'),
})

type Output = z.infer<typeof MemberRoleAddOutput>

export const memberRoleAdd = pikkuSessionlessFunc({
  description: 'Adds a role to a guild member',
  node: { displayName: 'Add Role to Member', category: 'Member', type: 'action' },
  input: MemberRoleAddInput,
  output: MemberRoleAddOutput,
  func: async ({ discord }, { guild_id, user_id, role_id }) => {
    await discord.request('PUT', `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`)
    return { success: true }
  },
})

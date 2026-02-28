import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberRoleRemoveInput = z.object({
  guild_id: z.string().describe('The ID of the guild'),
  user_id: z.string().describe('The ID of the user'),
  role_id: z.string().describe('The ID of the role to remove'),
})

export const MemberRoleRemoveOutput = z.object({
  success: z.boolean().describe('Whether the role was removed'),
})

type Output = z.infer<typeof MemberRoleRemoveOutput>

export const memberRoleRemove = pikkuSessionlessFunc({
  description: 'Removes a role from a guild member',
  node: { displayName: 'Remove Role from Member', category: 'Member', type: 'action' },
  input: MemberRoleRemoveInput,
  output: MemberRoleRemoveOutput,
  func: async ({ discord }, { guild_id, user_id, role_id }) => {
    await discord.request('DELETE', `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`)
    return { success: true }
  },
})

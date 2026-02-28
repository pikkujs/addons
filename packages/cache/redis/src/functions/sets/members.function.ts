import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SetMembersInput = z.object({
  key: z.string().describe('The set key'),
})

export const SetMembersOutput = z.object({
  members: z.array(z.string()).describe('All members of the set'),
})

type Output = z.infer<typeof SetMembersOutput>

export const setMembers = pikkuSessionlessFunc({
  description: 'Gets all members of a set',
  node: { displayName: 'Get Set Members', category: 'Sets', type: 'action' },
  input: SetMembersInput,
  output: SetMembersOutput,
  func: async ({ redis }, { key }) => {
    const members = await redis.smembers(key)
    return { members }
  },
})

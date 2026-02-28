import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SetIsMemberInput = z.object({
  key: z.string().describe('The set key'),
  value: z.string().describe('The value to check'),
})

export const SetIsMemberOutput = z.object({
  isMember: z.boolean().describe('Whether the value is a member of the set'),
})

type Output = z.infer<typeof SetIsMemberOutput>

export const setIsMember = pikkuSessionlessFunc({
  description: 'Checks if a value is a member of a set',
  node: { displayName: 'Check Set Membership', category: 'Sets', type: 'action' },
  input: SetIsMemberInput,
  output: SetIsMemberOutput,
  func: async ({ redis }, { key, value }) => {
    const result = await redis.sismember(key, value)
    return { isMember: result === 1 }
  },
})

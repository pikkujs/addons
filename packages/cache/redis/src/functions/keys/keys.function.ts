import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KeysInput = z.object({
  pattern: z.string().describe('Pattern to match keys (e.g., "user:*")'),
})

export const KeysOutput = z.object({
  keys: z.array(z.string()).describe('List of matching keys'),
})

type Output = z.infer<typeof KeysOutput>

export const keys = pikkuSessionlessFunc({
  description: 'Returns all keys matching a pattern',
  node: { displayName: 'Find Keys', category: 'Keys', type: 'action' },
  input: KeysInput,
  output: KeysOutput,
  func: async ({ redis }, { pattern }) => {
    const keys = await redis.keys(pattern)
    return { keys }
  },
})

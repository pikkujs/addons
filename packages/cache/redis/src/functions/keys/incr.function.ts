import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KeyIncrInput = z.object({
  key: z.string().describe('The key to increment'),
  ttl: z.number().optional().describe('Time to live in seconds (optional)'),
})

export const KeyIncrOutput = z.object({
  value: z.number().describe('The new value after incrementing'),
})

type Output = z.infer<typeof KeyIncrOutput>

export const keyIncr = pikkuSessionlessFunc({
  description: 'Atomically increments a key by 1',
  node: { displayName: 'Increment Key', category: 'Keys', type: 'action' },
  input: KeyIncrInput,
  output: KeyIncrOutput,
  func: async ({ redis }, { key, ttl }) => {
    const value = await redis.incr(key)
    if (ttl && ttl > 0) {
      await redis.expire(key, ttl)
    }
    return { value }
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KeySetInput = z.object({
  key: z.string().describe('The key to set'),
  value: z.string().describe('The value to set'),
  ttl: z.number().optional().describe('Time to live in seconds'),
})

export const KeySetOutput = z.object({
  success: z.boolean().describe('Whether the key was set'),
})

type Output = z.infer<typeof KeySetOutput>

export const keySet = pikkuSessionlessFunc({
  description: 'Sets the value of a key in Redis',
  node: { displayName: 'Set Key', category: 'Keys', type: 'action' },
  input: KeySetInput,
  output: KeySetOutput,
  func: async ({ redis }, { key, value, ttl }) => {
    if (ttl && ttl > 0) {
      await redis.set(key, value, 'EX', ttl)
    } else {
      await redis.set(key, value)
    }
    return { success: true }
  },
})

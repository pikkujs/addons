import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SetRemoveInput = z.object({
  key: z.string().describe('The set key'),
  value: z.string().describe('The value to remove'),
})

export const SetRemoveOutput = z.object({
  removed: z.number().describe('Number of elements removed (0 or 1)'),
})

type Output = z.infer<typeof SetRemoveOutput>

export const setRemove = pikkuSessionlessFunc({
  description: 'Removes a value from a set',
  node: { displayName: 'Remove from Set', category: 'Sets', type: 'action' },
  input: SetRemoveInput,
  output: SetRemoveOutput,
  func: async ({ redis }, { key, value }) => {
    const removed = await redis.srem(key, value)
    return { removed }
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KeyDeleteInput = z.object({
  key: z.string().describe('The key to delete'),
})

export const KeyDeleteOutput = z.object({
  deleted: z.number().describe('Number of keys deleted'),
})

type Output = z.infer<typeof KeyDeleteOutput>

export const keyDelete = pikkuSessionlessFunc({
  description: 'Deletes a key from Redis',
  node: { displayName: 'Delete Key', category: 'Keys', type: 'action' },
  input: KeyDeleteInput,
  output: KeyDeleteOutput,
  func: async ({ redis }, { key }) => {
    const deleted = await redis.del(key)
    return { deleted }
  },
})

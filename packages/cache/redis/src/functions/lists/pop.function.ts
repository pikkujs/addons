import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListPopInput = z.object({
  key: z.string().describe('The list key'),
  tail: z.boolean().optional().describe('Pop from tail (right) instead of head (left)'),
})

export const ListPopOutput = z.object({
  value: z.string().nullable().describe('The popped value'),
})

type Output = z.infer<typeof ListPopOutput>

export const listPop = pikkuSessionlessFunc({
  description: 'Pops a value from a Redis list',
  node: { displayName: 'Pop from List', category: 'Lists', type: 'action' },
  input: ListPopInput,
  output: ListPopOutput,
  func: async ({ redis }, { key, tail }) => {
    const value = tail
      ? await redis.rpop(key)
      : await redis.lpop(key)
    return { value }
  },
})

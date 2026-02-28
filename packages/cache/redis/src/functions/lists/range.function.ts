import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListRangeInput = z.object({
  key: z.string().describe('The list key'),
  start: z.number().default(0).describe('Start index'),
  stop: z.number().default(-1).describe('Stop index (-1 for end)'),
})

export const ListRangeOutput = z.object({
  values: z.array(z.string()).describe('List values in range'),
})

type Output = z.infer<typeof ListRangeOutput>

export const listRange = pikkuSessionlessFunc({
  description: 'Returns a range of elements from a Redis list',
  node: { displayName: 'List Range', category: 'Lists', type: 'action' },
  input: ListRangeInput,
  output: ListRangeOutput,
  func: async ({ redis }, { key, start = 0, stop = -1 }) => {
    const values = await redis.lrange(key, start, stop)
    return { values }
  },
})

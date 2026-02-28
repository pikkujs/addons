import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListLengthInput = z.object({
  key: z.string().describe('The list key'),
})

export const ListLengthOutput = z.object({
  length: z.number().describe('The length of the list'),
})

export const listLength = pikkuSessionlessFunc({
  description: 'Returns the length of a Redis list',
  node: { displayName: 'List Length', category: 'Lists', type: 'action' },
  input: ListLengthInput,
  output: ListLengthOutput,
  func: async ({ redis }, { key }) => {
    const length = await redis.llen(key)
    return { length }
  },
})

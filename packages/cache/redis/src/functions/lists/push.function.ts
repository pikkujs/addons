import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListPushInput = z.object({
  key: z.string().describe('The list key'),
  value: z.string().describe('The value to push'),
  tail: z.boolean().optional().describe('Push to tail (right) instead of head (left)'),
})

export const ListPushOutput = z.object({
  length: z.number().describe('The new length of the list'),
})

type Output = z.infer<typeof ListPushOutput>

export const listPush = pikkuSessionlessFunc({
  description: 'Pushes a value to a Redis list',
  node: { displayName: 'Push to List', category: 'Lists', type: 'action' },
  input: ListPushInput,
  output: ListPushOutput,
  func: async ({ redis }, { key, value, tail }) => {
    const length = tail
      ? await redis.rpush(key, value)
      : await redis.lpush(key, value)
    return { length }
  },
})

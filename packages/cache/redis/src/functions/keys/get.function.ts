import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KeyGetInput = z.object({
  key: z.string().describe('The key to get'),
})

export const KeyGetOutput = z.object({
  value: z.string().nullable().describe('The value of the key'),
})

type Output = z.infer<typeof KeyGetOutput>

export const keyGet = pikkuSessionlessFunc({
  description: 'Gets the value of a key from Redis',
  node: { displayName: 'Get Key', category: 'Keys', type: 'action' },
  input: KeyGetInput,
  output: KeyGetOutput,
  func: async ({ redis }, { key }) => {
    const value = await redis.get(key)
    return { value }
  },
})

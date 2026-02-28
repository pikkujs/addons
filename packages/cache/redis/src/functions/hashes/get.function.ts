import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HashGetInput = z.object({
  key: z.string().describe('The hash key'),
  field: z.string().describe('The field to get'),
})

export const HashGetOutput = z.object({
  value: z.string().nullable().describe('The value of the field'),
})

type Output = z.infer<typeof HashGetOutput>

export const hashGet = pikkuSessionlessFunc({
  description: 'Gets the value of a field in a hash',
  node: { displayName: 'Get Hash Field', category: 'Hashes', type: 'action' },
  input: HashGetInput,
  output: HashGetOutput,
  func: async ({ redis }, { key, field }) => {
    const value = await redis.hget(key, field)
    return { value: value ?? null }
  },
})

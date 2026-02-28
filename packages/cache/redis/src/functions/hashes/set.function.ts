import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HashSetInput = z.object({
  key: z.string().describe('The hash key'),
  field: z.string().describe('The field to set'),
  value: z.string().describe('The value to set'),
})

export const HashSetOutput = z.object({
  created: z.boolean().describe('Whether a new field was created (false if updated)'),
})

type Output = z.infer<typeof HashSetOutput>

export const hashSet = pikkuSessionlessFunc({
  description: 'Sets the value of a field in a hash',
  node: { displayName: 'Set Hash Field', category: 'Hashes', type: 'action' },
  input: HashSetInput,
  output: HashSetOutput,
  func: async ({ redis }, { key, field, value }) => {
    const result = await redis.hset(key, field, value)
    return { created: result === 1 }
  },
})

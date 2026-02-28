import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SetAddInput = z.object({
  key: z.string().describe('The set key'),
  value: z.string().describe('The value to add'),
})

export const SetAddOutput = z.object({
  added: z.number().describe('Number of elements added (0 if already existed)'),
})

type Output = z.infer<typeof SetAddOutput>

export const setAdd = pikkuSessionlessFunc({
  description: 'Adds a value to a set',
  node: { displayName: 'Add to Set', category: 'Sets', type: 'action' },
  input: SetAddInput,
  output: SetAddOutput,
  func: async ({ redis }, { key, value }) => {
    const added = await redis.sadd(key, value)
    return { added }
  },
})

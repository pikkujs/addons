import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HashDeleteInput = z.object({
  key: z.string().describe('The hash key'),
  field: z.string().describe('The field to delete'),
})

export const HashDeleteOutput = z.object({
  deleted: z.number().describe('Number of fields removed (0 or 1)'),
})

type Output = z.infer<typeof HashDeleteOutput>

export const hashDelete = pikkuSessionlessFunc({
  description: 'Deletes a field from a hash',
  node: { displayName: 'Delete Hash Field', category: 'Hashes', type: 'action' },
  input: HashDeleteInput,
  output: HashDeleteOutput,
  func: async ({ redis }, { key, field }) => {
    const deleted = await redis.hdel(key, field)
    return { deleted }
  },
})

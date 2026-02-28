import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HashGetAllInput = z.object({
  key: z.string().describe('The hash key'),
})

export const HashGetAllOutput = z.object({
  fields: z.record(z.string(), z.string()).describe('All field-value pairs in the hash'),
})

type Output = z.infer<typeof HashGetAllOutput>

export const hashGetAll = pikkuSessionlessFunc({
  description: 'Gets all fields and values in a hash',
  node: { displayName: 'Get All Hash Fields', category: 'Hashes', type: 'action' },
  input: HashGetAllInput,
  output: HashGetAllOutput,
  func: async ({ redis }, { key }) => {
    const fields = await redis.hgetall(key)
    return { fields }
  },
})

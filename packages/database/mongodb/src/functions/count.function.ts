import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountInput = z.object({
  collection: z.string().describe('Collection name'),
  filter: z.record(z.string(), z.any()).optional().describe('Query filter'),
})

export const CountOutput = z.object({
  count: z.number().describe('Number of matching documents'),
})

export const mongoCount = pikkuSessionlessFunc({
  description: 'Count documents in a MongoDB collection',
  input: CountInput,
  output: CountOutput,
  node: { displayName: 'Count Documents', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, filter }) => {
    const count = await mongodb.collection(collection).countDocuments(filter ?? {})
    return { count }
  },
})

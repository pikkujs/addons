import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteInput = z.object({
  collection: z.string().describe('Collection name'),
  filter: z.record(z.string(), z.any()).describe('Filter to match documents to delete'),
})

export const DeleteOneOutput = z.object({
  deletedCount: z.number(),
  acknowledged: z.boolean(),
})

export const mongoDeleteOne = pikkuSessionlessFunc({
  description: 'Delete a single document from a MongoDB collection',
  input: DeleteInput,
  output: DeleteOneOutput,
  node: { displayName: 'Delete Document', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, filter }) => {
    const result = await mongodb.collection(collection).deleteOne(filter)
    return {
      deletedCount: result.deletedCount,
      acknowledged: result.acknowledged,
    }
  },
})

export const DeleteManyOutput = z.object({
  deletedCount: z.number(),
  acknowledged: z.boolean(),
})

export const mongoDeleteMany = pikkuSessionlessFunc({
  description: 'Delete multiple documents from a MongoDB collection',
  input: DeleteInput,
  output: DeleteManyOutput,
  node: { displayName: 'Delete Documents', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, filter }) => {
    const result = await mongodb.collection(collection).deleteMany(filter)
    return {
      deletedCount: result.deletedCount,
      acknowledged: result.acknowledged,
    }
  },
})

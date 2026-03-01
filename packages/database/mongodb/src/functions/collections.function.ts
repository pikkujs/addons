import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCollectionsInput = z.object({
  filter: z.record(z.string(), z.any()).optional().describe('Filter for collection names'),
})

export const ListCollectionsOutput = z.object({
  collections: z.array(z.object({
    name: z.string(),
    type: z.string(),
  })).describe('List of collections'),
})

export const mongoListCollections = pikkuSessionlessFunc({
  description: 'List collections in the MongoDB database',
  input: ListCollectionsInput,
  output: ListCollectionsOutput,
  node: { displayName: 'List Collections', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { filter }) => {
    const collections = await mongodb.listCollections(filter ?? {}).toArray()
    return {
      collections: collections.map((c) => ({
        name: c.name,
        type: c.type ?? 'collection',
      })),
    }
  },
})

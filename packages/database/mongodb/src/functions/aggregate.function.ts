import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { stringifyObjectIds } from '../shared.js'

export const AggregateInput = z.object({
  collection: z.string().describe('Collection name'),
  pipeline: z.array(z.record(z.string(), z.any())).describe('Aggregation pipeline stages'),
})

export const AggregateOutput = z.object({
  documents: z.array(z.record(z.string(), z.any())).describe('Aggregation results'),
  count: z.number().describe('Number of results'),
})

export const mongoAggregate = pikkuSessionlessFunc({
  description: 'Run an aggregation pipeline on a MongoDB collection',
  input: AggregateInput,
  output: AggregateOutput,
  node: { displayName: 'Aggregate', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, pipeline }) => {
    const documents = await mongodb.collection(collection).aggregate(pipeline).toArray()
    return {
      documents: documents.map(stringifyObjectIds),
      count: documents.length,
    }
  },
})

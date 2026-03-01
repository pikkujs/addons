import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { stringifyObjectIds } from '../shared.js'

export const InsertOneInput = z.object({
  collection: z.string().describe('Collection name'),
  document: z.record(z.string(), z.any()).describe('Document to insert'),
})

export const InsertOneOutput = z.object({
  insertedId: z.string().describe('ID of the inserted document'),
  acknowledged: z.boolean(),
})

export const mongoInsertOne = pikkuSessionlessFunc({
  description: 'Insert a document into a MongoDB collection',
  input: InsertOneInput,
  output: InsertOneOutput,
  node: { displayName: 'Insert Document', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, document }) => {
    const result = await mongodb.collection(collection).insertOne(document)
    return {
      insertedId: stringifyObjectIds(result.insertedId),
      acknowledged: result.acknowledged,
    }
  },
})

export const InsertManyInput = z.object({
  collection: z.string().describe('Collection name'),
  documents: z.array(z.record(z.string(), z.any())).describe('Documents to insert'),
})

export const InsertManyOutput = z.object({
  insertedIds: z.array(z.string()).describe('IDs of the inserted documents'),
  insertedCount: z.number(),
  acknowledged: z.boolean(),
})

export const mongoInsertMany = pikkuSessionlessFunc({
  description: 'Insert multiple documents into a MongoDB collection',
  input: InsertManyInput,
  output: InsertManyOutput,
  node: { displayName: 'Insert Documents', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, documents }) => {
    const result = await mongodb.collection(collection).insertMany(documents)
    return {
      insertedIds: Object.values(result.insertedIds).map((id) => stringifyObjectIds(id)),
      insertedCount: result.insertedCount,
      acknowledged: result.acknowledged,
    }
  },
})

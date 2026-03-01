import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { stringifyObjectIds } from '../shared.js'

export const UpdateInput = z.object({
  collection: z.string().describe('Collection name'),
  filter: z.record(z.string(), z.any()).describe('Filter to match documents'),
  update: z.record(z.string(), z.any()).describe('Update operations (e.g. { $set: { field: value } })'),
  upsert: z.boolean().optional().describe('Insert if no match found'),
})

export const UpdateOneOutput = z.object({
  matchedCount: z.number(),
  modifiedCount: z.number(),
  upsertedId: z.string().nullable(),
  acknowledged: z.boolean(),
})

export const mongoUpdateOne = pikkuSessionlessFunc({
  description: 'Update a single document in a MongoDB collection',
  input: UpdateInput,
  output: UpdateOneOutput,
  node: { displayName: 'Update Document', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, filter, update, upsert }) => {
    const result = await mongodb.collection(collection).updateOne(filter, update, { upsert })
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId ? stringifyObjectIds(result.upsertedId) : null,
      acknowledged: result.acknowledged,
    }
  },
})

export const UpdateManyOutput = z.object({
  matchedCount: z.number(),
  modifiedCount: z.number(),
  acknowledged: z.boolean(),
})

export const mongoUpdateMany = pikkuSessionlessFunc({
  description: 'Update multiple documents in a MongoDB collection',
  input: UpdateInput,
  output: UpdateManyOutput,
  node: { displayName: 'Update Documents', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, filter, update, upsert }) => {
    const result = await mongodb.collection(collection).updateMany(filter, update, { upsert })
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      acknowledged: result.acknowledged,
    }
  },
})

export const FindOneAndUpdateInput = z.object({
  collection: z.string().describe('Collection name'),
  filter: z.record(z.string(), z.any()).describe('Filter to match document'),
  update: z.record(z.string(), z.any()).describe('Update operations'),
  upsert: z.boolean().optional().describe('Insert if no match found'),
  returnDocument: z.enum(['before', 'after']).optional().describe('Return document before or after update (default: after)'),
})

export const FindOneAndUpdateOutput = z.object({
  document: z.record(z.string(), z.any()).nullable().describe('The matched document'),
})

export const mongoFindOneAndUpdate = pikkuSessionlessFunc({
  description: 'Atomically find and update a document',
  input: FindOneAndUpdateInput,
  output: FindOneAndUpdateOutput,
  node: { displayName: 'Find & Update', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, filter, update, upsert, returnDocument }) => {
    const result = await mongodb.collection(collection).findOneAndUpdate(filter, update, {
      upsert,
      returnDocument: returnDocument ?? 'after',
    })
    return {
      document: result ? stringifyObjectIds(result) : null,
    }
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { stringifyObjectIds } from '../shared.js'
import type { Sort } from 'mongodb'

export const FindInput = z.object({
  collection: z.string().describe('Collection name'),
  query: z.record(z.string(), z.any()).optional().describe('Query filter (MongoDB query syntax)'),
  projection: z.record(z.string(), z.number()).optional().describe('Fields to include (1) or exclude (0)'),
  sort: z.record(z.string(), z.number()).optional().describe('Sort order (1 ascending, -1 descending)'),
  limit: z.number().optional().describe('Maximum number of documents to return'),
  skip: z.number().optional().describe('Number of documents to skip'),
})

export const FindOutput = z.object({
  documents: z.array(z.record(z.string(), z.any())).describe('Matching documents'),
  count: z.number().describe('Number of documents returned'),
})

export const mongoFind = pikkuSessionlessFunc({
  description: 'Find documents in a MongoDB collection',
  input: FindInput,
  output: FindOutput,
  node: { displayName: 'Find Documents', category: 'Database', type: 'action' },
  func: async ({ mongodb }, { collection, query, projection, sort, limit, skip }) => {
    let cursor = mongodb.collection(collection).find(query ?? {})
    if (projection) cursor = cursor.project(projection)
    if (sort) cursor = cursor.sort(sort as Sort)
    if (skip) cursor = cursor.skip(skip)
    if (limit) cursor = cursor.limit(limit)
    const documents = await cursor.toArray()
    return {
      documents: documents.map(stringifyObjectIds),
      count: documents.length,
    }
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { pineconeFetch } from '../pinecone.js'

export const UpsertInput = z.object({
  collection: z
    .string()
    .describe('The Pinecone namespace to write to (empty for the default)'),
  points: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]),
        vector: z.array(z.number()),
        payload: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .describe('The points (id + vector + optional metadata) to upsert'),
})

export const UpsertOutput = z.object({
  upserted: z.number().describe('Number of vectors written'),
})

export const upsert = pikkuSessionlessFunc({
  description: 'Upsert embedding vectors into a Pinecone index',
  node: { displayName: 'Upsert', category: 'Write', type: 'action' },
  input: UpsertInput,
  output: UpsertOutput,
  func: async ({ pinecone }, { collection, points }) => {
    await pineconeFetch(pinecone, `/vectors/upsert`, {
      namespace: collection,
      vectors: points.map((p) => ({
        id: String(p.id),
        values: p.vector,
        metadata: p.payload,
      })),
    })
    return { upserted: points.length }
  },
})

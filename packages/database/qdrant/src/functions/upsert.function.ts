import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { qdrantFetch } from '../qdrant.js'

export const UpsertInput = z.object({
  collection: z.string().describe('The Qdrant collection to write to'),
  points: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]),
        vector: z.array(z.number()),
        payload: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .describe('The points (id + vector + optional payload) to upsert'),
})

export const UpsertOutput = z.object({
  upserted: z.number().describe('Number of points written'),
})

export const upsert = pikkuSessionlessFunc({
  description: 'Upsert embedding points into a Qdrant collection',
  node: { displayName: 'Upsert', category: 'Write', type: 'action' },
  input: UpsertInput,
  output: UpsertOutput,
  func: async ({ qdrant }, { collection, points }) => {
    await qdrantFetch(
      qdrant,
      `/collections/${encodeURIComponent(collection)}/points`,
      { points }
    )
    return { upserted: points.length }
  },
})

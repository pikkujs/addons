import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { pineconeQuery } from '../pinecone.js'

export const SearchInput = z.object({
  collection: z
    .string()
    .describe('The Pinecone namespace to search (empty for the default)'),
  vector: z.array(z.number()).describe('The query embedding vector'),
  topK: z
    .number()
    .optional()
    .describe('Maximum number of matches to return (default 4)'),
})

export const MatchSchema = z.object({
  id: z.union([z.string(), z.number()]),
  score: z.number(),
  payload: z.record(z.string(), z.unknown()),
})

export const SearchOutput = z.object({
  matches: z.array(MatchSchema),
})

export const search = pikkuSessionlessFunc({
  description: 'Search a Pinecone index by a pre-computed embedding vector',
  node: { displayName: 'Vector Search', category: 'Search', type: 'action' },
  input: SearchInput,
  output: SearchOutput,
  func: async ({ pinecone }, { collection, vector, topK }) => {
    const matches = await pineconeQuery(pinecone, collection, vector, topK ?? 4)
    return { matches }
  },
})

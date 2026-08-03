import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { pineconeQuery } from '../pinecone.js'

export const QueryInput = z.object({
  collection: z
    .string()
    .describe('The Pinecone namespace to search (empty for the default)'),
  query: z.string().describe('The natural-language text to search for'),
  topK: z
    .number()
    .optional()
    .describe('Maximum number of matches to return (default 4)'),
})

export const QueryMatchSchema = z.object({
  id: z.union([z.string(), z.number()]),
  score: z.number(),
  payload: z.record(z.string(), z.unknown()),
})

export const QueryOutput = z.object({
  query: z.string().describe('The original query text, echoed for downstream use'),
  matches: z.array(QueryMatchSchema),
})

export const query = pikkuSessionlessFunc({
  description:
    'Embed a text query (via the aiEmbedding service) and search a Pinecone index in one call',
  node: { displayName: 'Query', category: 'Search', type: 'action' },
  input: QueryInput,
  output: QueryOutput,
  func: async ({ pinecone, aiEmbedding }, { collection, query, topK }) => {
    if (!aiEmbedding) {
      throw new Error(
        'pinecone:query requires an aiEmbedding service wired into singletonServices'
      )
    }
    const vector = await aiEmbedding.embedQuery(query)
    const matches = await pineconeQuery(pinecone, collection, vector, topK ?? 4)
    return { query, matches }
  },
})

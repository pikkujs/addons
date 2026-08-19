import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const VectorSearchInput = z.object({
  collection: z
    .string()
    .optional()
    .describe(
      'The pgvector match function to call (default "match_documents", n8n\'s convention)'
    ),
  vector: z.array(z.number()).describe('The query embedding vector'),
  topK: z
    .number()
    .optional()
    .describe('Maximum number of matches to return (default 4)'),
})

export const VectorMatchSchema = z.object({
  id: z.union([z.string(), z.number()]),
  score: z.number(),
  payload: z.record(z.string(), z.unknown()),
})

export const VectorSearchOutput = z.object({
  matches: z.array(VectorMatchSchema),
})

interface MatchRow {
  id: string | number
  content?: unknown
  metadata?: Record<string, unknown> | null
  similarity?: number
}

export const search = pikkuSessionlessFunc({
  description:
    'Search a Supabase pgvector store by a pre-computed embedding vector (via a match function)',
  node: { displayName: 'Vector Search', category: 'Vector', type: 'action' },
  input: VectorSearchInput,
  output: VectorSearchOutput,
  func: async ({ supabase }, { collection, vector, topK }) => {
    const matchFn = collection || 'match_documents'
    const { data, error } = await supabase.rpc(matchFn, {
      query_embedding: vector,
      match_count: topK ?? 4,
    })
    if (error) {
      throw new Error(`Supabase vector search error: ${error.message ?? JSON.stringify(error)}`)
    }
    const matches = ((data ?? []) as MatchRow[]).map((row) => ({
      id: row.id,
      score: row.similarity ?? 0,
      payload: { content: row.content, metadata: row.metadata ?? {} },
    }))
    return { matches }
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VectorQueryInput = z.object({
  collection: z
    .string()
    .optional()
    .describe(
      'The pgvector match function to call (default "match_documents", n8n\'s convention)'
    ),
  query: z.string().describe('The natural-language text to search for'),
  topK: z
    .number()
    .optional()
    .describe('Maximum number of matches to return (default 4)'),
})

export const VectorQueryMatchSchema = z.object({
  id: z.union([z.string(), z.number()]),
  score: z.number(),
  payload: z.record(z.string(), z.unknown()),
})

export const VectorQueryOutput = z.object({
  query: z.string().describe('The original query text, echoed for downstream use'),
  matches: z.array(VectorQueryMatchSchema),
})

interface MatchRow {
  id: string | number
  content?: unknown
  metadata?: Record<string, unknown> | null
  similarity?: number
}

export const query = pikkuSessionlessFunc({
  description:
    'Embed a text query (via the aiEmbedding service) and search a Supabase pgvector store in one call',
  node: { displayName: 'Query', category: 'Vector', type: 'action' },
  input: VectorQueryInput,
  output: VectorQueryOutput,
  func: async ({ supabase, aiEmbedding }, { collection, query, topK }) => {
    if (!aiEmbedding) {
      throw new Error(
        'supabase:query requires an aiEmbedding service wired into singletonServices'
      )
    }
    const vector = await aiEmbedding.embedQuery(query)
    const matchFn = collection || 'match_documents'
    const { data, error } = await supabase.rpc(matchFn, {
      query_embedding: vector,
      match_count: topK ?? 4,
    })
    if (error) {
      throw new Error(`Supabase vector query error: ${error.message ?? JSON.stringify(error)}`)
    }
    const matches = ((data ?? []) as MatchRow[]).map((row) => ({
      id: row.id,
      score: row.similarity ?? 0,
      payload: { content: row.content, metadata: row.metadata ?? {} },
    }))
    return { query, matches }
  },
})

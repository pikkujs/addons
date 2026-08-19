import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const VectorIngestInput = z.object({
  collection: z
    .string()
    .optional()
    .describe('The pgvector table to insert into (default "documents")'),
  texts: z.array(z.string()).describe('Text chunks to embed and store'),
})

export const VectorIngestOutput = z.object({
  upserted: z.number().describe('Number of rows written'),
})

export const ingest = pikkuSessionlessFunc({
  description:
    'Embed text chunks (via the aiEmbedding service) and insert them into a Supabase pgvector table',
  node: { displayName: 'Ingest', category: 'Vector', type: 'action' },
  input: VectorIngestInput,
  output: VectorIngestOutput,
  func: async ({ supabase, aiEmbedding }, { collection, texts }) => {
    if (!aiEmbedding) {
      throw new Error(
        'supabase:ingest requires an aiEmbedding service wired into singletonServices'
      )
    }
    if (texts.length === 0) return { upserted: 0 }
    const vectors = await aiEmbedding.embedDocuments(texts)
    const table = collection || 'documents'
    const rows = texts.map((text, i) => ({
      content: text,
      embedding: vectors[i],
    }))
    const { error } = await supabase.from(table).insert(rows)
    if (error) {
      throw new Error(
        `Supabase vector ingest error: ${error.message ?? JSON.stringify(error)}`
      )
    }
    return { upserted: rows.length }
  },
})

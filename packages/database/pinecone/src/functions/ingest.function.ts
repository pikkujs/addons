import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { pineconeFetch } from '../pinecone.js'

export const IngestInput = z.object({
  collection: z
    .string()
    .describe('The Pinecone namespace to write to (empty for the default)'),
  texts: z.array(z.string()).describe('Text chunks to embed and store'),
})

export const IngestOutput = z.object({
  upserted: z.number().describe('Number of vectors written'),
})

export const ingest = pikkuSessionlessFunc({
  description:
    'Embed text chunks (via the aiEmbedding service) and upsert them into a Pinecone index',
  node: { displayName: 'Ingest', category: 'Write', type: 'action' },
  input: IngestInput,
  output: IngestOutput,
  func: async ({ pinecone, aiEmbedding }, { collection, texts }) => {
    if (!aiEmbedding) {
      throw new Error(
        'pinecone:ingest requires an aiEmbedding service wired into singletonServices'
      )
    }
    if (texts.length === 0) return { upserted: 0 }
    const vectors = await aiEmbedding.embedDocuments(texts)
    await pineconeFetch(pinecone, `/vectors/upsert`, {
      namespace: collection,
      vectors: texts.map((text, i) => ({
        id: globalThis.crypto.randomUUID(),
        values: vectors[i],
        metadata: { text },
      })),
    })
    return { upserted: texts.length }
  },
})

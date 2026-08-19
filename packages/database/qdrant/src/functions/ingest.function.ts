import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { qdrantFetch } from '../qdrant.js'

export const IngestInput = z.object({
  collection: z.string().describe('The Qdrant collection to write to'),
  texts: z.array(z.string()).describe('Text chunks to embed and store'),
})

export const IngestOutput = z.object({
  upserted: z.number().describe('Number of points written'),
})

export const ingest = pikkuSessionlessFunc({
  description:
    'Embed text chunks (via the aiEmbedding service) and upsert them into a Qdrant collection',
  node: { displayName: 'Ingest', category: 'Write', type: 'action' },
  input: IngestInput,
  output: IngestOutput,
  func: async ({ qdrant, aiEmbedding }, { collection, texts }) => {
    if (!aiEmbedding) {
      throw new Error(
        'qdrant:ingest requires an aiEmbedding service wired into singletonServices'
      )
    }
    if (texts.length === 0) return { upserted: 0 }
    const vectors = await aiEmbedding.embedDocuments(texts)
    const points = texts.map((text, i) => ({
      id: globalThis.crypto.randomUUID(),
      vector: vectors[i],
      payload: { text },
    }))
    await qdrantFetch(
      qdrant,
      `/collections/${encodeURIComponent(collection)}/points`,
      { points }
    )
    return { upserted: points.length }
  },
})

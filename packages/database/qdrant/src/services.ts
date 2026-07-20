import { pikkuAddonServices } from '#pikku'
import type { QdrantConfig } from './qdrant.js'

export const createSingletonServices = pikkuAddonServices(
  async (_config, { variables, secrets, aiEmbedding }) => {
    const url = (await variables.get<string>('QDRANT_URL')) ?? 'http://localhost:6333'
    const apiKey = await secrets.getSecret('QDRANT_API_KEY').catch(() => undefined)
    const qdrant: QdrantConfig = { url, apiKey: apiKey || undefined }
    return { qdrant, aiEmbedding }
  }
)

import { pikkuAddonServices } from '#pikku/addon/setup'
import type { QdrantConfig } from './qdrant.js'

export const createSingletonServices = pikkuAddonServices(
  async (_config, { variables, secrets, aiEmbedding }) => {
    const url = (await variables.get<string>('QDRANT_URL')) ?? 'http://localhost:6333'
    const apiKey = await secrets
      .getSecret('QDRANT_API_KEY')
      .then((s) => s?.reveal())
      .catch(() => undefined)
    const qdrant: QdrantConfig = { url, apiKey: apiKey || undefined }
    return { qdrant, aiEmbedding }
  }
)

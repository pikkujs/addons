import { pikkuAddonServices } from '#pikku/addon/setup'
import type { PineconeConfig } from './pinecone.js'

export const createSingletonServices = pikkuAddonServices(
  async (_config, { variables, secrets, aiEmbedding }) => {
    const host = (await variables.get<string>('PINECONE_HOST')) ?? ''
    const apiKey = (await secrets.getSecret('PINECONE_API_KEY')).reveal()
    const pinecone: PineconeConfig = { host, apiKey }
    return { pinecone, aiEmbedding }
  }
)

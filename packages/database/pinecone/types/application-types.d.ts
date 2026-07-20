import type {
  AIEmbeddingService,
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { PineconeConfig } from '../src/pinecone.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  pinecone: PineconeConfig
  aiEmbedding?: AIEmbeddingService
}

export interface Services extends CoreServices<SingletonServices> {}

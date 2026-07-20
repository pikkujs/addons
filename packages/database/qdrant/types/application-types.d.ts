import type {
  AIEmbeddingService,
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { QdrantConfig } from '../src/qdrant.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  qdrant: QdrantConfig
  aiEmbedding?: AIEmbeddingService
}

export interface Services extends CoreServices<SingletonServices> {}

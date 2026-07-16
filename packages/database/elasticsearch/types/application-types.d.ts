import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { ElasticsearchService } from '../src/elasticsearch-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  elasticsearch: ElasticsearchService
}

export interface Services extends CoreServices<SingletonServices> {}

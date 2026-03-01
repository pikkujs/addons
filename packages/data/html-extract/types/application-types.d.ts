import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { HtmlExtractService } from '../src/html-extract-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  htmlExtract: HtmlExtractService
}

export interface Services extends CoreServices<SingletonServices> {}

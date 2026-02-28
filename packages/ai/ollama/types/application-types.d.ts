import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { createOpenAI } from '@ai-sdk/openai'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  ollama: ReturnType<typeof createOpenAI>
}

export interface Services extends CoreServices<SingletonServices> {}

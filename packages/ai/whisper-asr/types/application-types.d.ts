import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { ContentService } from '@pikku/core/services'
import type { WhisperASRService } from '../src/whisper-asr.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  whisperASR: WhisperASRService
  content: ContentService
}

export interface Services extends CoreServices<SingletonServices> {}

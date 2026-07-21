import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleFirebaseRealtimeDatabaseService } from '../src/google-firebase-realtime-database-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleFirebaseRealtimeDatabase: GoogleFirebaseRealtimeDatabaseService
}

export interface Services extends CoreServices<SingletonServices> {}

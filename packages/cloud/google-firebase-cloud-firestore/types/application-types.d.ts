import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleFirebaseCloudFirestoreService } from '../src/google-firebase-cloud-firestore-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleFirebaseCloudFirestore: GoogleFirebaseCloudFirestoreService
}

export interface Services extends CoreServices<SingletonServices> {}

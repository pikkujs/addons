import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleFirebaseRealtimeDatabaseBaseUrlSchema = z.enum(["https://firebaseio.local"]).default("https://firebaseio.local")

wireVariable({
  name: 'GOOGLE_FIREBASE_REALTIME_DATABASE_BASE_URL',
  displayName: 'Firebase Realtime DB Base URL',
  description: 'The base URL for the Firebase Realtime DB API.',
  variableId: 'GOOGLE_FIREBASE_REALTIME_DATABASE_BASE_URL',
  schema: googleFirebaseRealtimeDatabaseBaseUrlSchema,
})

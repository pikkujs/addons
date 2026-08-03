import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleFirebaseRealtimeDatabaseBaseUrlSchema = z.enum(["https://firebaseio.local"]).default("https://firebaseio.local")

defineVariable({
  name: 'GOOGLE_FIREBASE_REALTIME_DATABASE_BASE_URL',
  displayName: 'Firebase Realtime DB Base URL',
  description: 'The base URL for the Firebase Realtime DB API.',
  variableId: 'GOOGLE_FIREBASE_REALTIME_DATABASE_BASE_URL',
  schema: googleFirebaseRealtimeDatabaseBaseUrlSchema,
})

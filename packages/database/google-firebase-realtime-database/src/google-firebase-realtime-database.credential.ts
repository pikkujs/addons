import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const googleFirebaseRealtimeDatabaseCredentialSchema = z.object({
  apiKey: z.string().describe('Firebase Realtime DB API key'),
})

wireCredential({
  name: 'googleFirebaseRealtimeDatabase',
  displayName: 'Firebase Realtime DB',
  description: 'firebase addon',
  type: 'wire',
  schema: googleFirebaseRealtimeDatabaseCredentialSchema,
})

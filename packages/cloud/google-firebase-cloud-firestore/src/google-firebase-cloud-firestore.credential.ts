import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleFirebaseCloudFirestoreTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'googleFirebaseCloudFirestore',
  displayName: 'Google Cloud Firestore',
  description: 'Interact with Google Firebase Cloud Firestore',
  type: 'wire',
  schema: googleFirebaseCloudFirestoreTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_FIREBASE_CLOUD_FIRESTORE_OAUTH_APP',
    tokenSecretId: 'GOOGLE_FIREBASE_CLOUD_FIRESTORE_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})

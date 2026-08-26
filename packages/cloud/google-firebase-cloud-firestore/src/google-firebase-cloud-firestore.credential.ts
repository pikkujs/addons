import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const googleFirebaseCloudFirestoreTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleFirebaseCloudFirestoreOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'googleFirebaseCloudFirestoreOAuthApp',
  displayName: 'Google Cloud Firestore OAuth App',
  description: 'OAuth2 app credentials for Google Cloud Firestore',
  secretId: 'GOOGLE_FIREBASE_CLOUD_FIRESTORE_OAUTH_APP',
  schema: googleFirebaseCloudFirestoreOAuthAppSchema,
  optional: true,
})

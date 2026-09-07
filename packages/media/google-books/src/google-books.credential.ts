import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleBooksTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'googleBooks',
  displayName: 'Google Books',
  description: 'Google Books addon',
  type: 'wire',
  schema: googleBooksTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_BOOKS_OAUTH_APP',
    tokenSecretId: 'GOOGLE_BOOKS_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})

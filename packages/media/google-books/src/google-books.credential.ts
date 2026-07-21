import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const googleBooksTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleBooksOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
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

wireSecret({
  name: 'googleBooksOAuthApp',
  displayName: 'Google Books OAuth App',
  description: 'OAuth2 app credentials for Google Books',
  secretId: 'GOOGLE_BOOKS_OAUTH_APP',
  schema: googleBooksOAuthAppSchema,
})

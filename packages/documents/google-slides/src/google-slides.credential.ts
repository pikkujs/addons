import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const googleSlidesTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleSlidesOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'googleSlides',
  displayName: 'Google Slides',
  description: 'Consume the Google Slides API',
  type: 'wire',
  schema: googleSlidesTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_SLIDES_OAUTH_APP',
    tokenSecretId: 'GOOGLE_SLIDES_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})

defineSecret({
  name: 'googleSlidesOAuthApp',
  displayName: 'Google Slides OAuth App',
  description: 'OAuth2 app credentials for Google Slides',
  secretId: 'GOOGLE_SLIDES_OAUTH_APP',
  schema: googleSlidesOAuthAppSchema,
})

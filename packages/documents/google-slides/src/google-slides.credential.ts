import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleSlidesTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
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

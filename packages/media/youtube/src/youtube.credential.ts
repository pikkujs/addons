import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const youtubeTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'youtube',
  displayName: 'YouTube',
  description: 'YouTube integration for Pikku',
  type: 'wire',
  schema: youtubeTokenSchema,
  oauth2: {
    appCredentialSecretId: 'YOUTUBE_OAUTH_APP',
    tokenSecretId: 'YOUTUBE_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

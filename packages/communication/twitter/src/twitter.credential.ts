import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const twitterTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'twitter',
  displayName: 'X (Twitter)',
  description: 'Post, like, search tweets, send DMs, manage lists and users via the X API',
  type: 'wire',
  schema: twitterTokenSchema,
  oauth2: {
    appCredentialSecretId: 'TWITTER_OAUTH_APP',
    tokenSecretId: 'TWITTER_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

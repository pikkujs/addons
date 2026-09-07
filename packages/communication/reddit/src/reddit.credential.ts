import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const redditTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'reddit',
  displayName: 'Reddit',
  description: 'Consume the Reddit API',
  type: 'wire',
  schema: redditTokenSchema,
  oauth2: {
    appCredentialSecretId: 'REDDIT_OAUTH_APP',
    tokenSecretId: 'REDDIT_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

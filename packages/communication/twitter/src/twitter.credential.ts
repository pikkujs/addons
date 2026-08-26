import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const twitterTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const twitterOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'twitterOAuthApp',
  displayName: 'X (Twitter) OAuth App',
  description: 'OAuth2 app credentials for X (Twitter)',
  secretId: 'TWITTER_OAUTH_APP',
  schema: twitterOAuthAppSchema,
  optional: true,
})
